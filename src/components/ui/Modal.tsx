import Button from "./Button";

const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <Button
            onClick={onClose}
            icon="x"
            size={"sm"}
            className="text-gray-400 hover:text-gray-600"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
