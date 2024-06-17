// src/components/Password.js
import React, { useState , useEffect } from 'react';
import PasswordCard from './PasswordCard';
import PasswordModal from './PasswordModal';
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useContext } from "react";
import usercontext from "../context/userContext";
import axios from 'axios';
import {Toaster , toast} from "react-hot-toast"

const Password = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const session=useContext(usercontext);
  
  const navigate=useNavigate();

  const [signedin, setsignedin] = useState()
  const handleSignIn = () => {
    navigate('/signup'); // Adjust the path to your sign-in route
  };
  
    const [passwords, setPasswords] = useState([]);
    useEffect(() => {  
      if (!session?.success) {
        setsignedin(false)
      }
      else if (session.success){
        setsignedin(true);
      }
      const getpasswords = async () => {
        const { data } = await axios.post(`${apiUrl}/fetchPassword`, {
          email: session?.data?.email,
        });
        
        if (data.success) {
          setPasswords(data.data);
        } else {
          toast.error("Could not fetch passwords");
        }
      };
      if(session?.success) 
        getpasswords();
    }, [session]);

    const [changedone, setchangedone] = useState(false)
    useEffect(() => {  
      const getpasswords = async () => {
        const { data } = await axios.post(`${apiUrl}/fetchPassword`, {
          email: session?.data?.email,
        });
       
        if (data.success) {
          setPasswords(data.data);
        } else {
          toast.error("Could not fetch passwords");
        }
      };
      if(session?.success) 
        getpasswords();
    }, [changedone]);

    const updatepasswords = async (_id,domain,username,password,additional_details) => {
      const { data } = await axios.post(`${apiUrl}/updatePassword`, {
        _id,domain,username,password,additional_details
      });
     
      if (data.success) {
        toast.success("Password updated");
        setchangedone(!changedone);
        
      } else {
        toast.error("Could not update password");
      }
    };

    const addpasswords=async(domain,username,password,additional_details)=>{
      
      const { data } = await axios.post(`${apiUrl}/addPassword`, {
        email:session.data.email,
        domain,username,password,additional_details
      });
      
      if (data.success) {
        toast.success("Password added");
        setchangedone(!changedone);
        
      } else {
        toast.error("Could not add password");
      }
    }

    const deletepasswords = async(_id) => {
      if (_id) {
        const { data } = await axios.post(`${apiUrl}/deletePassword`, {
          _id:_id,
        });
        
        if (data.success) {
          toast.success("Password deleted");
          setchangedone(!changedone);
        } else {
          toast.error("Could not delete password");
        }
      }
    };
  
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [passwordToDelete, setPasswordToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const addPassword = () => {
    setSelectedPassword({
      id: null,
      domain: '',
      username: '',
      password: '',
      notes: '',
      mode: 'edit'
    });
  };

  const savePassword = (password) => {
    
    if (password._id!=null) {
      
      updatepasswords(password._id,password.domain, password.username, password.password, password.notes)
    } else {
      
      addpasswords(password.domain, password.username, password.password, password.notes)
    }
    setSelectedPassword(null);
  };

  const deletePassword = (id) => {
    
    deletepasswords(id);
    setPasswordToDelete(null);
  };

  const closeModal = () => setSelectedPassword(null);
  const closeDeleteModal = () => setPasswordToDelete(null);

  // Filter passwords based on search query
  const filteredPasswords = passwords?.filter(password =>
    password?.domain?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    password?.username?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    password?.additional_details?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div>{!signedin && <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-[#4d4d4d] p-6 -mt-32 rounded-2xl lg:w-1/2 w-[90%] lg:shadow-2xl lg:shadow-white text-center">
      <h1 className="text-3xl text-white mb-4 font-sans font-semibold">Save Your Passwords Securely</h1>
        <p className="text-lg bg-black p-4 px-8 rounded-xl   text-white mb-8">
          Worried about forgetting your passwords? We've got your back. Sign in now to store and access your daily routines, notes, and passwords securely.
        </p>
        <button
          onClick={handleSignIn}
          className="bg-[#f9f9f9] shadow-xl text-xl shadow-black text-black font-semibold font-sans py-2 mb-4 px-4 rounded-lg hover:scale-95"
        >
          Sign In to Continue
        </button>
      </div>
    </div>}
    {signedin &&<div className="container mx-auto p-4">
      <Toaster />
      <header className="flex justify-between lg:justify-around lg:relative items-center mb-4">
        <input
          type="text"
          className="border w-2/3 lg:w-1/2 p-2 rounded-full text-white bg-[#050505]"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={addPassword} className="bg-white text-black lg:absolute right-2 p-2 rounded-full px-4">Add New</button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-4">
      {passwords?.length === 0 && (
            <div className="flex items-center justify-center mt-24">
              <div className="bg-[#4d4d4d]  text-white p-4 rounded-lg shadow-lg text-center">
                <p className="text-2xl font-sans font-semibold">
                  Currently, you don't have any password.
                </p>
                <p className="text-lg mt-4">Click on &nbsp;<strong>Add new</strong>&nbsp; to save one. </p>
              </div>
            </div>
          )}
        {filteredPasswords?.map(password => (
          <PasswordCard
            key={password._id}
            password={password}
            setSelectedPassword={setSelectedPassword}
            setPasswordToDelete={setPasswordToDelete}
          />
        ))}
      </div>
      {selectedPassword && (
        <PasswordModal
          password={selectedPassword}
          savePassword={savePassword}
          closeModal={closeModal}
        />
      )}
      {passwordToDelete && (
        <DeleteConfirmationModal
          password={passwordToDelete}
          deletePassword={deletePassword}
          closeModal={closeDeleteModal}
        />
      )}
    </div>}</div>
  );
};

export default Password;
