// import React, { useState, useEffect } from "react";

// const RoutineDetails = ({ day, routine, onSave, onClose }) => {
//   const [entries, setEntries] = useState(routine.details || []);
//   const [edit, setEdit] = useState(false);

//   // Function to compare times and sort in ascending order
//   const sortEntries = (entries) => {
//     return [...entries].sort((a, b) => a.time.localeCompare(b.time));
//   };

//   // Sort entries
//   useEffect(() => {
//     setEntries(sortEntries(entries));
//   }, []);

//   const handleChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedEntries = entries.map((entry, i) =>
//       i === index ? { ...entry, [name]: value } : entry
//     );
//     setEntries(updatedEntries);
//   };

//   const handleAddEntry = () => {
//     setEntries([...entries, { time: "", task: "" }]);
//   };

//   const handleRemoveEntry = (index) => {
//     const updatedEntries = entries.filter((_, i) => i !== index);
//     setEntries(updatedEntries);
//   };

//   const handleSave = () => {
//     const updatedRoutine = { ...routine, details: entries };
//     onSave(updatedRoutine);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-[#4d4d4d] p-6 rounded-2xl lg:w-1/2 w-[90%]">
//         <h2 className="text-white text-2xl mb-4">{day}'s Routine</h2>
//         {!edit && (
//           <>
//             {entries.map((entry, index) => (
//               <div key={index} className="flex gap-4 mb-4">
//                 <div className="w-full p-2 bg-[#101010] text-white rounded-2xl">
//                   {entry.time}&nbsp; - &nbsp;{entry.task}
//                 </div>
//               </div>
//             ))}
//             <div className="flex mt-6 justify-end gap-4">
//               <button
//                 onClick={onClose}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   setEdit(true);
//                 }}
//                 className="bg-[#f9f9f9] text-black px-4 py-2 rounded"
//               >
//                 Edit
//               </button>
//             </div>
//           </>
//         )}
//         {edit && (
//           <>
//             {entries.map((entry, index) => (
//               <div key={index} className="flex gap-4 mb-4">
//                 <input
//                   type="time"
//                   name="time"
//                   value={entry.time}
//                   onChange={(e) => handleChange(index, e)}
//                   className="w-1/3 p-2 text-black"
//                 />
//                 <input
//                   type="text"
//                   name="task"
//                   value={entry.task}
//                   onChange={(e) => handleChange(index, e)}
//                   placeholder="Task"
//                   className="w-2/3 p-2 text-black"
//                 />
//                 <button
//                   onClick={() => handleRemoveEntry(index)}
//                   className="bg-[#2f2f2f] text-white px-4 py-2 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               onClick={handleAddEntry}
//               className="bg-[#2f2f2f] text-white px-4 py-2 rounded mb-4"
//             >
//               Add Entry
//             </button>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => {
//                   setEdit(false);
//                 }}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="bg-white text-black px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RoutineDetails;




import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

const RoutineDetails = ({ day, routine, onSave, onClose, onDeleteTask }) => {
  const [entries, setEntries] = useState(routine.details || []);
  const [edit, setEdit] = useState(false);

  // Function to compare times and sort in ascending order
  const sortEntries = (entries) => {
    return [...entries].sort((a, b) => a.time.localeCompare(b.time));
  };

  // Sort entries
  useEffect(() => {
    setEntries(sortEntries(entries));
  }, []);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [name]: value } : entry
    );
    setEntries(updatedEntries);
  };

  const handleAddEntry = () => {
    
    setEntries([...entries, { time: "", task: "" }]);
  };

  const handleRemoveEntry = async (index) => {
    const taskId = entries[index]._id;
    await onDeleteTask(day, taskId);
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleSave = () => {
    const updatedRoutine = { ...routine, details: entries };
    onSave(updatedRoutine);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#4d4d4d] max-h-[70%] p-2 pr-0 rounded-2xl lg:w-1/2 w-[90%]">
        <h2 className="text-white text-center p-2 text-2xl mb-4">{day}'s Routine</h2>
        {!edit && (
          <><div className="max-h-[70%] overflow-y-auto"> 
            {entries.map((entry, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <div className="w-full p-2 bg-[#101010] text-white mr-2 rounded-2xl">
                  {entry.time}&nbsp; - &nbsp;{entry.task}
                </div>
              </div>
            ))}
            </div>
            <div className="flex mt-6 justify-end mr-4 mb-2 gap-4">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setEdit(true);
                }}
                className="bg-[#f9f9f9] text-black px-4 py-2 rounded"
              >
                Edit
              </button>
            </div>
          </>
        )}
        {edit && (
          <><div className="max-h-[67%] overflow-y-auto">
            {entries.map((entry, index) => (
              <div key={index} className="flex gap-1 mb-4">
                <input
                  type="time"
                  name="time"
                  value={entry.time}
                  onChange={(e) => handleChange(index, e)}
                  className="w-1/3 p-2 px-1 text-black"
                />
                <input
                  type="textbox"
                  name="task"
                  value={entry.task}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Task"
                  className="w-2/3 p-2 text-black"
                />
                <button
                  onClick={() => handleRemoveEntry(index)}
                  className="bg-[#2f2f2f] text-white mr-2 text-2xl px-2  py-2 rounded"
                >
                  <MdDelete />
                </button>
              </div>
            ))}</div>
            <button
              onClick={handleAddEntry}
              className="bg-[#2f2f2f] text-white px-4 mt-4 py-2 rounded mb-4"
            >
              Add Entry
            </button>
            <div className="flex justify-end -mt-6 mr-4 gap-4">
              <button
                onClick={() => {
                  setEdit(false);
                }}
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

export default RoutineDetails;
