
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark bg-opacity-75 flex align-items-center justify-content-center">
      <div className="darkblue px-5 py-3 rounded shadow max-w-md">
        <button className="float-right" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
