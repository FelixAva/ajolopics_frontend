import Swal, { type SweetAlertIcon } from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const AdviceModal = (
  title: (string | undefined),
  icon?: SweetAlertIcon
) => {
  Swal.fire({
    position: 'center',
    customClass: {

    },
    title: title,
    icon: icon
  });
}

export default AdviceModal;
