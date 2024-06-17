// src/components/PasswordModal.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PasswordModal = ({ password, savePassword, closeModal }) => {
  const [editablePassword, setEditablePassword] = useState(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditablePassword({ ...editablePassword, [name]: value });
  };

  const handleSave = () => {
    savePassword(editablePassword);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50">
      <div className="bg-[#303030] p-6 rounded-xl shadow-lg w-11/12 md:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold font-sans text-white">{password.mode === 'view' ? 'View Password' : 'Edit Password'}</h2>
          <button onClick={closeModal} className="text-white p-1 px-2 hover:scale-90 rounded-xl border-2">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        
        {password.mode === 'view' ? (
          <div className='text-white space-y-2 text-md  font-sans bg-black p-4 rounded-xl shadow-lg'>
            <p><strong>Domain :</strong> {editablePassword.domain}</p>
            <p><strong>Username :</strong> {editablePassword.username}</p>
            <p><strong>Password :</strong> {editablePassword.password}</p>
            {editablePassword.additional_details && <p><strong>Additional Notes:</strong> {editablePassword.additional_details}</p>}
          </div>
        ) : (
          <div className=" text-white ">
            <h1 className='px-2 mt-2'>Domain :</h1>
            <input
              type="text"
              name="domain"
              value={editablePassword.domain}
              onChange={handleChange}
              className=" bg-black p-2 px-4 rounded-xl  w-full"
              placeholder="Domain"
            />
            <h1 className='px-2 mt-2'>Username :</h1>
            <input
              type="text"
              name="username"
              value={editablePassword.username}
              onChange={handleChange}
              className="bg-black p-2 px-4 rounded-xl w-full"
              placeholder="Username"
            />
            <h1 className='px-2 mt-2'>Password :</h1>
            <input
              type="text"
              name="password"
              value={editablePassword.password}
              onChange={handleChange}
              className="bg-black p-2 px-4 rounded-xl w-full"
              placeholder="Password"
            />
            <h1 className='px-2 mt-2'>Additional Notes :</h1>
            <textarea
              name="notes"
              value={editablePassword.additional_details}
              onChange={handleChange}
              className="bg-black p-2 px-4 rounded-xl w-full"
              placeholder="Additional Notes"
              rows="3"
            />
          </div>
        )}
        <div className="flex justify-end mt-4">
          {password.mode === 'edit' && (
            <button onClick={handleSave} className="bg-white hover:scale-95 text-black p-2 rounded-full px-5 mr-4">Save</button>
          )}
          <button onClick={closeModal} className="bg-white hover:scale-95 text-black p-2 rounded-full px-4">Close</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
