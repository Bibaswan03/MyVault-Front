import React, { useEffect , useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './pages/Home';
import Routine from './pages/Routine';
import Notes from './pages/Notes';
import usercontext from './context/userContext';
import Password from './pages/Passwords';
import Signup from './Login/Signup/Signup';
import axios from 'axios'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
    const [login_obj, setlogin_obj] = useState({})
    const token=localStorage.getItem('token');
    useEffect(() => {
      const checkvalidtoken=async()=>{
        const {data}=await axios.post(`${apiUrl}/checklogin`,{token});
        setlogin_obj(data);
        if(!data.success){
          localStorage.removeItem('token');
          window.location='/signup';
        }
      }
      if(token){
      checkvalidtoken();
      }
      
    }, [])
    
    return (
        <Router>
            <usercontext.Provider value={login_obj}>
            <div className="">
                <Sidebar />
                <div className="">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/routine" element={<Routine />} />
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/password" element={<Password />} />
                        <Route path="/signup" element={<Signup />}/>
                    </Routes>
                </div>
            </div>
            </usercontext.Provider>
        </Router>
    );
}

export default App;
