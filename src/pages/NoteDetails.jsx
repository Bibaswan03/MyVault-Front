// src/components/NoteDetails.jsx
import React, { useEffect, useState } from "react";

const NoteDetails = ({ note,onEdit, onAdd, onClose, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  useEffect(() => {
    if (note.mode === 'edit') {
      setEditing(true);
    }
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const currentDate = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
    const updatedNote = { ...editedNote, time: currentDate };
    if(updatedNote._id==null)
      onAdd(updatedNote.title, updatedNote.description,updatedNote.time)
    else
      onEdit(updatedNote._id, updatedNote.title, updatedNote.description);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#4d4d4d] p-6 rounded-2xl lg:w-1/2 w-[90%]">
        <h2 className="text-white text-2xl mb-4">{note.title}</h2>
        {!editing && (
          <>
            <div className="w-full p-2 mb-4 bg-[#101010] overflow-x-scroll text-white rounded-2xl">
              {note.description}
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => setEditing(true)}
                className="bg-[#f9f9f9] text-black px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(note)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </>
        )}
        {editing && (
          <>
            <h1 className="text-white text-md">Title:</h1>
            <input
              type="text"
              name="title"
              value={editedNote.title}
              onChange={handleChange}
              className="w-full p-2 mb-4 bg-[#101010] text-white rounded-2xl"
              placeholder="Title"
            />
            <h1 className="text-white text-md mt-2">Description:</h1>
            <textarea
              name="description"
              value={editedNote.description}
              onChange={handleChange}
              className="w-full p-2 mb-4 bg-[#101010] text-white rounded-2xl"
              rows="5"
              placeholder="Description"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-white text-black px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
