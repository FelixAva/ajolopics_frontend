// Import form components
import Input from './ui/Input';
import InputPassword from './ui/InputPassword';
import SelectInput from './ui/SelectInput';
import InputFile from './ui/InputFile';
import InputArea from './ui/InputArea';

// Import Post components
import PostsMasonryGrid from '../features/post/components/PostsMasonryGrid';
import PostPreviewCard from '../features/post/components/PostPreviewCard';
import CreatePostModal from '../features/post/components/CreatePostModal';

// Import Shared components
import Button from './ui/Button';
import Badge from './ui/Badge';
import Spinner from './ui/Spinner';
import BurgerButton from './ui/BurgerButton';
import LanguageModal from '../features/language/components/LanguageModal';
import { imageCompressor } from '../features/post/utils/imageCompressor.canvas';

// Import Modals components
import FiltersModal from '../features/post/components/FiltersModal'
import FiltersForm from '../features/post/components/FiltersForm'

export {
  // Export Post components
  PostsMasonryGrid,
  PostPreviewCard,
  CreatePostModal,

  // Export Shared components
  Button,
  Badge,
  Spinner,
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
}
