// src/components/DeleteConfirmationModal.jsx
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const DeleteConfirmationModal = ({ note, deleteNote, closeModal }) => {
  const handleDelete = () => {
    deleteNote();
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 md:w-1/2">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Confirm Delete</h2>
          <button onClick={closeModal} className="text-red-500">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <p className=" mb-4">Are you sure you want to delete this note?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
