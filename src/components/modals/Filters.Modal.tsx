import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import withReactContent from 'sweetalert2-react-content';

import Input from '../form/Input';

const Filters = () => {
  withReactContent(Swal).fire({
    position:'top-right',
    title: <i>Input something</i>,
    html: <div className='flex justify-center'><Input label='Search' /></div>,
    cancelButtonText:'Clear Filters',
    
  });
}

export default Filters;
