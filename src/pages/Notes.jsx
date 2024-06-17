// src/components/Notes.jsx
import React, { useState, useEffect } from "react";
import NoteDetails from "./NoteDetails";
import DeleteConfirmationModal from "./NotesDeleteConfirmationModal";
import "./Notes.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import usercontext from "../context/userContext";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const Notes = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [signedin, setsignedin] = useState()
  const session = useContext(usercontext);
  
  const navigate=useNavigate();
  const [notes, setNotes] = useState([]);

  const handleSignIn = () => {
    navigate('/signup'); // Adjust the path to your sign-in route
  };
  useEffect(() => {  
    if (!session?.success) {
      setsignedin(false)
    }
    else if (session.success){
      setsignedin(true);
    }
    const getnotes = async () => {
      const { data } = await axios.post(`${apiUrl}/fetchNote`, {
        email: session?.data?.email,
      });
      
      if (data.success) {
        setNotes(data.data);
      } else {
        toast.error("Could not fetch note");
      }
    };
    if(session?.success) 
      getnotes();
  }, [session]);

  const [changedone, setchangedone] = useState(false)
  useEffect(() => {  
    const getnotes = async () => {
      const { data } = await axios.post(`${apiUrl}/fetchNote`, {
        email: session?.data?.email,
      });
      
      if (data.success) {
        setNotes(data.data);
      } else {
        toast.error("Could not fetch note");
      }
    };
    if(session?.success) 
      getnotes();
  }, [changedone]);

  const updatenotes = async (_id, title, description) => {
    const { data } = await axios.post(`${apiUrl}/updateNote`, {
      _id,
      title,
      description,
    });
    
    if (data.success) {
      setNotes(data.data);
      handleClose();
      toast.success("Note updated");
      setchangedone(!changedone);
    } else {
      toast.error("Could not update note");
    }
  };

  const addnotes=async(title,description,time)=>{
    const { data } = await axios.post(`${apiUrl}/addNote`, {
      email:session.data.email,
      title,
      description,
      time
    });
    
    if (data.success) {
      handleClose();
      toast.success("Note added");
      setchangedone(!changedone);
    } else {
      toast.error("Could not update note");
    }
  }

  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleCardClick = (note) => {
    setSelectedNote(note);
  };

  const handleClose = () => {
    setSelectedNote(null);
  };

  

  const addNote = () => {
    setSelectedNote({
      _id: null,
      title: "",
      description: "",
      time: `${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`,
      mode: "edit",
    });
  };

  const handleDelete = (note) => {
    setNoteToDelete(note);
  };

  const deleteNote = async() => {
    if (noteToDelete) {
      const { data } = await axios.post(`${apiUrl}/deleteNote`, {
        _id:noteToDelete._id,
      });
      
      if (data.success) {
        handleClose();
        toast.success("Note deleted");
        setchangedone(!changedone);
      } else {
        toast.error("Could not update note");
      }
    }
  };

  // Filter notes based on search query
  const filteredNotes = notes?.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {!signedin && <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-[#4d4d4d] p-6 -mt-32 rounded-2xl lg:w-1/2 w-[90%] lg:shadow-2xl lg:shadow-white text-center">
      <h1 className="text-3xl text-white mb-4 font-sans font-semibold">Save Your Important Notes Securely</h1>
        <p className="text-lg bg-black p-4 px-8 rounded-xl   text-white mb-8">
          Worried about losing your notes? We've got your back. Sign in now to store and access your daily routines, notes, and passwords securely.
        </p>
        <button
          onClick={handleSignIn}
          className="bg-[#f9f9f9] shadow-xl text-xl shadow-black text-black font-semibold font-sans py-2 mb-4 px-4 rounded-lg hover:scale-95"
        >
          Sign In to Continue
        </button>
      </div>
    </div>}
      {signedin&&<div>
      <Toaster />
      <header className="flex mx-4 justify-between lg:justify-around lg:relative mt-4 items-center mb-4">
        <input
          type="text"
          className="border w-2/3 lg:w-1/2 p-2 rounded-full text-white bg-[#050505]"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={addNote}
          className="bg-white text-black lg:absolute right-2 p-2 hover:scale-95 rounded-full px-4"
        >
          Add New
        </button>
      </header>
      <div className="p-10 flex justify-center items-center gap-8 flex-wrap">
      {notes?.length === 0 && (
            <div className="flex items-center justify-center mt-24">
              <div className="bg-[#4d4d4d]  text-white p-4 rounded-lg shadow-lg text-center">
                <p className="text-2xl font-sans font-semibold">
                  Currently, you don't have any notes.
                </p>
                <p className="text-lg mt-4">Click on &nbsp;<strong>Add new</strong>&nbsp; to save one. </p>
              </div>
            </div>
          )}
        {filteredNotes?.map((item) => (
          <div
            key={item._id}
            onClick={() => handleCardClick(item)}
            className="flex flex-col hover:cursor-pointer"
          >
            <div className="card">
              <h2>{item.title}</h2>
              <hr />
              <h3>{item.description}</h3>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
      {selectedNote && (
        <NoteDetails
          note={selectedNote}
          onEdit={updatenotes}
          onAdd={addnotes}
          onClose={handleClose}
          onDelete={handleDelete}
        />
      )}
      {noteToDelete && (
        <DeleteConfirmationModal
          note={noteToDelete}
          deleteNote={deleteNote}
          closeModal={() => setNoteToDelete(null)}
        />
      )}
    </div>}
    </div>
  );
};

export default Notes;
