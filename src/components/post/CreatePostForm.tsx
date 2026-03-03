import { useState } from "react";
import Button from "../shared/Button";
import SelectInput from "../form/SelectInput";
import Input from "../form/Input";
import { DynamicIcon } from "lucide-react/dynamic";

interface FileWithPreview {
  file: File;
  preview: string;
}

const CreatePostForm = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    console.log(e.target.files);

    const filesMapped = Array.from(e.target.files);
    const withPreview = filesMapped.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setFiles(prev => [...prev, ...withPreview]);
  }


  return (
    <form className="flex flex-col gap-5">
       <div className="w-full">
         <label
          className="flex flex-col items-center justify-center w-full min-h-40 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors border-dusty-olive hover:bg-dusty-olive/5"
        >
          <div className="flex flex-col items-center justify-center py-6 text-dusty-olive">
            <DynamicIcon name="upload" size={32} className="mb-3" />
            <p className="text-lg font-medium">
              Drag and drop or click to upload
            </p>
          </div>

          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>


      <div className="flex">
        {files.map((fileObj, index) => (
                          <div
                            key={index}
                            data-index={index}
                            className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200 shadow-sm cursor-pointer"
                            title="Click to remove"
                            role="button"
                            tabIndex={0}
                          >
                            <img src={fileObj.preview} alt={`preview-${index}`} className="w-full h-full object-cover pointer-events-none" /> 
                          </div>
                        ))}
      </div>

      <Input
        label="Title"
        placeholder="February Sunset.."
      />

      <div className="w-auto flex flex-col text-left">
        <p className="text-lg">Description</p>
        <textarea
          placeholder="Share a message.."
          className="w-full border border-dusty-olive rounded-lg px-2.5 py-1.5 focus:outline-dusty-olive-700 min-h-20 resize-y"
        />
      </div>


      <div className="pt-2">
        <Button
          title="Publish to Gallery"
          type="button"
          icon="upload"
          className="w-full bg-[#4A6E5A] hover:bg-[#3D5B4A] text-white"
          action={() => {}}
        />
      </div>
    </form>
  );
}

export default CreatePostForm;

// import { useRef, useState } from 'react';
// import usePost from '../../features/post/usePost';
// import { Input, Button, SelectInput } from '../';
// import { DynamicIcon } from 'lucide-react/dynamic';

// interface Props {
//   onClose?: () => void;
// }

// interface FileWithPreview {
//   file: File;
//   preview: string;
// }

// const MOCK_TAGS = [
//   { value: '1', label: 'Portrait' },
//   { value: '2', label: 'Nature' },
//   { value: '3', label: 'Wildlife' },
//   { value: '4', label: 'Urban' },
//   { value: '5', label: 'Architecture' },
// ];

// const ASPECT_RATIO_OPTIONS = [
//   { value: 'LANDSCAPE', label: 'Horizontal' },
//   { value: 'PORTRAIT', label: 'Vertical' },
//   { value: 'SQUARE', label: 'Square' },
// ];

// export default function CreatePostForm({ onClose }: Props) {
//   const [files, setFiles] = useState<FileWithPreview[]>([]);

//   const handleFilesAdded = (newFiles: File[]) => {
//   const mappedFiles = newFiles.map(file => ({
//     file,
//     previewUrl: URL.createObjectURL(file) // Creamos la URL temporal en RAM
//   }));
//   setFiles(prev => [...prev, ...mappedFiles]);
// };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;

//     if(!files) return;

//     console.log('FileList completo:', files);
//     console.log('FileList cantidad:', files.length);

//     const fileArray = Array.from(files);

//     fileArray.forEach((file, index) => {
//       console.log(`Archivo ${index + 1}`);
//       console.log("Nombre:", file.name);
//       console.log("Tipo:", file.type);
//       console.log("Tamaño (bytes):", file.size);
//       console.log("Última modificación:", new Date(file.lastModified));
//       console.log("-----------------------------");
//     });
//   }

//   return (
//     <form className="flex flex-col gap-5">
//       <div className="w-full">
//         <label
//           className="flex flex-col items-center justify-center w-full min-h-40 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors border-dusty-olive hover:bg-dusty-olive/5"
//         >
//           <div className="flex flex-col items-center justify-center py-6 text-dusty-olive">
//             <DynamicIcon name="upload" size={32} className="mb-3" />
//             <p className="text-lg font-medium">
//               Drag and drop or click to upload
//             </p>
//           </div>

//           <input
//             type="file"
//             className="hidden"
//             accept="image/*"
//             multiple
//             onChange={handleFileChange}
//           />
//         </label>
//       </div>

//       <Input
//         label="Title"
//         placeholder="February Sunset.."
//       />

//       <div className="w-auto flex flex-col text-left">
//         <p className="text-lg">Description</p>
//         <textarea
//           placeholder="Share a message.."
//           className="w-full border border-dusty-olive rounded-lg px-2.5 py-1.5 focus:outline-dusty-olive-700 min-h-20 resize-y"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <SelectInput
//           label="Tags"
//           name="tags"
//           isMulti
//           options={MOCK_TAGS}
//           placeholder="Select tags..."
//         />

//         <SelectInput
//           label="Aspect Ratio"
//           name="aspectRatio"
//           options={ASPECT_RATIO_OPTIONS}
//           placeholder="Horizontal"
//         />
//       </div>

//       <div className="pt-2">
//         <Button
//           title="Publish to Gallery"
//           type="button"
//           icon="upload"
//           className="w-full bg-[#4A6E5A] hover:bg-[#3D5B4A] text-white"
//           action={() => {}}
//         />
//       </div>
//     </form>
//   );
// }
