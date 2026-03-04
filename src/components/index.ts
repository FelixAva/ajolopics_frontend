// Import form components
import Input from './form/Input';
import InputPassword from './form/InputPassword';
import SelectInput from './form/SelectInput';
import InputFile from './form/InputFile';

// Import Post components
import PostPreviewCard from './post/PostPreviewCard';
import CreatePostModal from './post/CreatePostModal';

// Import Shared components
import Button from './shared/Button';
import Badge from './shared/Badge';
import Spinner from './shared/Spinner';
import Header from './shared/Header';
import { imageCompressor } from './shared/imageCompressor.canvas';

// Import Modals components
import FiltersModal from './modals/Filter/FiltersModal'
import FiltersComponent from './modals/Filter/FiltersForm'
import AdviceModal from './modals/AdviceModal';

export {
  // Export Post components
  PostPreviewCard,
  CreatePostModal,

  // Export Shared components
  Button,
  Badge,
  Spinner,
  Header,
  imageCompressor,

  // Export Form components
  Input,
  InputPassword,
  SelectInput,
  InputFile,

  // Modals
  FiltersModal,
  FiltersComponent,
  AdviceModal,
}
