// src/components/PasswordCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const PasswordCard = ({ password, setSelectedPassword, setPasswordToDelete }) => {
  const handleView = () => setSelectedPassword({ ...password, mode: 'view' });
  const handleEdit = () => setSelectedPassword({ ...password, mode: 'edit' });
  const handleDelete = () => setPasswordToDelete(password);

  return (
    <div className="bg-black border p-4 md:mx-10 rounded-2xl shadow-lg transform transition-transform ">
      <div className="font-bold text-lg text-white">{password.domain}</div>
      <p className="text-gray-300">Username: {password.username.slice(0, 3) + '***'}</p>
      <div className="flex justify-end mt-4 text-xl  space-x-6">
        <button onClick={handleView} className="text-white hover:scale-90 mr-2">
          <FontAwesomeIcon icon={faEye} /> <span className='text-base'> View</span> 
        </button>
        <button onClick={handleEdit} className="text-white hover:scale-90 mr-2">
          <FontAwesomeIcon icon={faEdit} /><span className='text-base'> Edit</span> 
        </button>
        <button onClick={handleDelete} className="text-white hover:scale-90 mr-2">
          <FontAwesomeIcon icon={faTrash} /> <span className='text-base'> Delete</span> 
        </button>
      </div>
    </div>
  );
};

export default PasswordCard;
