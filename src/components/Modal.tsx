import React, { useState } from "react";

interface ModalProps {
  onSave: (title: string) => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    if (title.trim()) {
      onSave(title);
      setTitle("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
          Add New Event
        </h2>
        <label className="block text-gray-600 dark:text-gray-300 mb-2">
          Event Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-4"
          placeholder="Enter event title"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
