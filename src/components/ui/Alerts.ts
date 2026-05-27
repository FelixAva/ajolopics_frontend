import Swal from 'sweetalert2';

type ToastType = 'success' | 'error' | 'info';

export const showAjolopicsToast = (type: ToastType, title: string) => {
  const styles = {
    success: {
      popup: '!bg-muted !border-primary-soft-hover !text-primary-active !shadow-primary-hover',
      timerProgressBar: '!bg-primary-ring',
      iconColor: 'var(--primary-active)',
    },
    error: {
      popup: '!bg-danger-subtle !border-danger-border !text-danger-foreground !shadow-danger-background',
      timerProgressBar: '!bg-danger-ring',
      iconColor: 'var(--danger-foreground)',
    },
    info: {
      popup: '!bg-info-background !border-info-border !text-info-foreground !shadow-info-shadow',
      timerProgressBar: '!bg-info-progress',
      iconColor: 'var(--info-icon)',
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
