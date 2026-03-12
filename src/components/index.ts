// Import form components
import Input from './form/Input';
import InputPassword from './form/InputPassword';
import SelectInput from './form/SelectInput';
import InputFile from './form/InputFile';
import InputArea from './form/InputArea';

// Import Post components
import PostsMasonryGrid from './post/PostsMasonryGrid';
import PostPreviewCard from './post/PostPreviewCard';
import CreatePostModal from './post/CreatePostModal';

// Import Shared components
import Button from './shared/Button';
import Badge from './shared/Badge';
import Spinner from './shared/Spinner';
import Header from './shared/Header';
import BurgerButton from './shared/BurgerButton';
import LanguageModal from './shared/LanguageModal';
import { imageCompressor } from './shared/imageCompressor.canvas';

// Import Modals components
import FiltersModal from './post/FiltersModal'
import FiltersForm from './post/FiltersForm'
import AdviceModal from './modals/AdviceModal';

export {
  // Export Post components
  PostsMasonryGrid,
  PostPreviewCard,
  CreatePostModal,

  // Export Shared components
  Button,
  Badge,
  Spinner,
  Header,
  imageCompressor,
  BurgerButton,
  LanguageModal,

  // Export Form components
  Input,
  InputPassword,
  SelectInput,
  InputFile,
  InputArea,

  // Modals
  FiltersModal,
  FiltersForm as FiltersComponent,
  AdviceModal,
}
