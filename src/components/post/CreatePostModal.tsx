// src/components/modals/CreatePostModal.tsx
import { DynamicIcon } from 'lucide-react/dynamic';
import CreatePostForm from './CreatePostForm'; // Ajusta la ruta si es necesario

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    // Backdrop (Fondo oscuro semitransparente)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      {/* Contenedor del Modal */}
      <div className="bg-white rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden">

        {/* Cabecera */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800">Preparing Artwork</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <DynamicIcon name="x" size={24} />
          </button>
        </div>

        {/* Cuerpo (Formulario) */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <CreatePostForm onClose={onClose} />
        </div>

      </div>
    </div>
  );
};

export default CreatePostModal;
