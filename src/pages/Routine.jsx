// import React, { useState ,useEffect } from "react";
// import "./Routine.css";
// import RoutineDetails from "./RoutineDetails";
// import { useContext } from "react";
// import usercontext from "../context/userContext";
// const Routine = () => {
//   const session=useContext(usercontext);
//   //console.log(session);
//   const [signedin, setsignedin] = useState()
//   const handleSignIn = () => {
//     navigate('/signup'); // Adjust the path to your sign-in route
//   };
//   useEffect(() => {
//     if (!session?.success) {
//       setsignedin(false)
//     }
//     else if (session.success){
//       setsignedin(true);
//     }
//   }, [session])
  
//   const [routines, setRoutines] = useState([
//     { id: 1, day: "Sunday", details: [] },
//     { id: 2, day: "Monday", details: [] },
//     { id: 3, day: "Tuesday", details: [] },
//     { id: 4, day: "Wednesday", details: [] },
//     { id: 5, day: "Thursday", details: [] },
//     { id: 6, day: "Friday", details: [] },
//     { id: 7, day: "Saturday", details: [] },
//   ]);

//   const [selectedRoutine, setSelectedRoutine] = useState(null);

//   const handleIconClick = (routine) => {
//     setSelectedRoutine(routine);
//   };

//   const handleClose = () => {
//     setSelectedRoutine(null);
//   };

//   const handleSave = (updatedRoutine) => {
//     setRoutines((prevRoutines) =>
//       prevRoutines.map((routine) =>
//         routine.id === updatedRoutine.id ? updatedRoutine : routine
//       )
//     );
//     handleClose();
//   };

//   return (
//     <div>{!signedin && <div className="min-h-screen flex items-center justify-center bg-transparent">
//       <div className="bg-[#4d4d4d] p-6 -mt-32 rounded-2xl lg:w-1/2 w-[90%] lg:shadow-2xl lg:shadow-white text-center">
//       <h1 className="text-3xl text-white mb-4 font-sans font-semibold">Save Your Routines Securely</h1>
//         <p className="text-lg bg-black p-4 px-8 rounded-xl   text-white mb-8">
//           Want to follow a fixed routine? We've got your back. Sign in now to store and access your daily routines, notes, and passwords securely.
//         </p>
//         <button
//           onClick={handleSignIn}
//           className="bg-[#f9f9f9] shadow-xl text-xl shadow-black text-black font-semibold font-sans py-2 mb-4 px-4 rounded-lg hover:scale-95"
//         >
//           Sign In to Continue
//         </button>
//       </div>
//     </div>}
//     {signedin&&<div>
//       <div className="mt-10 mb-20 flex justify-center items-center gap-8 flex-wrap">
//         {routines.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => handleIconClick(item)}
//             className="bg-[#101010] relative hover:bg-[#4d4c4c] border-0 rounded-full w-[95%] md:h-20 h-14 flex flex-col"
//           >
//             <h1 className="ml-6 p-3 md:p-6 text-white md:text-2xl text-xl">
//               {item.day}
//             </h1>
//             <span className="text-white hover:cursor-pointer absolute ml-6 p-4 md:p-7 right-8">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="size-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
//                 />
//               </svg>
//             </span>
//           </div>
//         ))}
//       </div>
//       {selectedRoutine && (
//         <RoutineDetails
//           day={selectedRoutine.day}
//           routine={selectedRoutine}
//           onSave={handleSave}
//           onClose={handleClose}
//         />
//       )}
//     </div>}</div>
//   );
// };

// export default Routine;









import React, { useState, useEffect, useContext } from "react";
import "./Routine.css";
import RoutineDetails from "./RoutineDetails";
import { useNavigate } from "react-router-dom";
import usercontext from "../context/userContext";
import {Toaster,toast} from "react-hot-toast"
import axios from "axios";

const Routine = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const session = useContext(usercontext);
  const navigate = useNavigate();
  const [signedin, setsignedin] = useState();
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const handleSignIn = () => {
    navigate('/signup'); // Adjust the path to your sign-in route
  };

  useEffect(() => {
    if (!session?.success) {
      setsignedin(false);
    } else if (session?.success) {
      setsignedin(true);
      fetchRoutines(session?.data?.email);
    }
  }, [session]);

  const [changedone, setchangedone] = useState(false)
  useEffect(() => {
    fetchRoutines(session?.data?.email);
  }, [changedone, setchangedone]);
  

  const fetchRoutines = async (email) => {
      const {data} = await axios.post(`${apiUrl}/fetchRoutine`,{email});
      if (data.success) {
        setRoutines(data.data);
      }
      else{
        alert("Couldn't fetch tasks");
      }
  };

  const handleIconClick = (routine) => {
    setSelectedRoutine(routine);
  };

  const handleClose = () => {
    setSelectedRoutine(null);
  };

  const handleSave = async (updatedRoutine) => {
    try {
      //await saveRoutine(updatedRoutine);
      
      const { data } = await axios.post(`${apiUrl}/saveRoutine`, {
        email:session.data.email,
        day:updatedRoutine.day,
        details:updatedRoutine.details
      });
      
      if (data.success) {
        toast.success("Tasks saved"); 
        setchangedone(!changedone)
        handleClose();     
      } else {
        toast.error("Could not add task");
      }
    } catch (error) {
      console.error("Error saving task", error);
    }
  };

  const handleDeleteTask = async (day, taskId) => {
    try {
      //await deleteTask(session.userId, day, taskId);
      const { data } = await axios.post(`${apiUrl}/deleteRoutine`, {
        email:session.data.email,
        day:day,
        taskId:taskId
      });
      
      if (data.success) {
        toast.success("Task deleted");     
        setchangedone(!changedone)
      } else {
        toast.error("Could not delete task");
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div>
      <Toaster/>
      {!signedin && (
        <div className="min-h-screen flex items-center justify-center bg-transparent">
          <div className="bg-[#4d4d4d] p-6 -mt-32 rounded-2xl lg:w-1/2 w-[90%] lg:shadow-2xl lg:shadow-white text-center">
            <h1 className="text-3xl text-white mb-4 font-sans font-semibold">Save Your Routines Securely</h1>
            <p className="text-lg bg-black p-4 px-8 rounded-xl text-white mb-8">
              Want to follow a fixed routine? We've got your back. Sign in now to store and access your daily routines, notes, and passwords securely.
            </p>
            <button
              onClick={handleSignIn}
              className="bg-[#f9f9f9] shadow-xl text-xl shadow-black text-black font-semibold font-sans py-2 mb-4 px-4 rounded-lg hover:scale-95"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      )}
      {signedin && (
        <div>
          <div className="mt-10 mb-20 flex justify-center items-center gap-8 flex-wrap">
            {routines.map((item) => (
              <div
                key={item._id}
                onClick={() => handleIconClick(item)}
                className="bg-[#101010] relative hover:bg-[#4d4c4c] border-0 rounded-full w-[95%] md:h-20 h-14 flex flex-col"
              >
                <h1 className="ml-6 p-3 md:p-6 text-white md:text-2xl text-xl">
                  {item.day}
                </h1>
                <span className="text-white hover:cursor-pointer absolute ml-6 p-4 md:p-7 right-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
          {selectedRoutine && (
            <RoutineDetails
              day={selectedRoutine.day}
              routine={selectedRoutine}
              onSave={handleSave}
              onClose={handleClose}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Routine;
