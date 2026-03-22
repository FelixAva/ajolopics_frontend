import Swal from 'sweetalert2';

// Definimos los tipos permitidos
type ToastType = 'success' | 'error' | 'info';

export const showAjolopicsToast = (type: ToastType, title: string) => {
  const styles = {
    success: {
      popup: '!bg-beige-100 !border-deep-teal-200 !text-deep-teal-700 !shadow-deep-teal-100',
      timerProgressBar: '!bg-deep-teal-500',
      iconColor: '!deep-teal-700',
    },
    error: {
      popup: '!bg-smoky-rose-50 !border-smoky-rose-200 !text-smoky-rose-700 !shadow-smoky-rose-100',
      timerProgressBar: '!bg-smoky-rose-500',
      iconColor: '!smoky-rose-700',
    },
    info: {
      popup: '!bg-purple-50 !border-purple-200 !text-purple-700 !shadow-purple-100',
      timerProgressBar: '!bg-purple-500',
      iconColor: '#a855f7',
    },
  };

  const currentStyle = styles[type];

  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    showCloseButton: true,
    timerProgressBar: true,
    icon: type,
    title: title,

    background: 'transparent',
    color: 'inherit',
    iconColor: currentStyle.iconColor,

    customClass: {
      popup: `border rounded-2xl shadow-lg !p-4 font-sans ${currentStyle.popup}`,
      title: 'font-semibold text-sm m-0',
      timerProgressBar: currentStyle.timerProgressBar,
    },

    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
};
