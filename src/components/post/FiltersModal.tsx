import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import withReactContent from 'sweetalert2-react-content';
import FiltersComponent from './FiltersForm';

const FiltersModal = (title: string) => {
  withReactContent(Swal).fire({
    position:'top-right',
    customClass: {
      container: '!p-0',
      htmlContainer: '!flex !flex-col !flex-1 !h-screen',
      popup: '!w-full !h-screen !flex !flex-col !flex-1 !rounded-none md:!w-auto',
      title: '!text-left !text-2xl',
      closeButton: '!absolute !right-0'
    },
    title: title,
    html: <FiltersComponent />,
    showCloseButton: true,
    showConfirmButton: false,
  });
}

export default FiltersModal;
