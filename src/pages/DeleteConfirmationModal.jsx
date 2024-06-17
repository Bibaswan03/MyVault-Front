// src/components/DeleteConfirmationModal.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const DeleteConfirmationModal = ({ password, deletePassword, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 md:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Confirm Delete</h2>
          <button onClick={closeModal} className="text-red-500">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <p>Are you sure you want to delete the password for <strong>{password.domain}</strong>?</p>
        <div className="flex justify-end mt-4">
          <button onClick={() => deletePassword(password._id)} className="bg-red-500 text-white p-2 rounded mr-2">Delete</button>
          <button onClick={closeModal} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
