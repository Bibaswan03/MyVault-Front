// import React, { useState } from "react";
// import "./sidebar.css";
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center p-4 bg-[#101010] text-white">
//         <div className="flex items-center">
//           <span className="text-3xl cursor-pointer" onClick={toggleNavbar}>
//             &#9776;
//           </span>
//         </div>
//         <div>
//           <button class="animated-button">
//             <svg
//               viewBox="0 0 24 24"
//               class="arr-2"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
//             </svg>
//             <span class="text">Sign in</span>
//             <span class="circle"></span>
//             <svg
//               viewBox="0 0 24 24"
//               class="arr-1"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
//             </svg>
//           </button>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="fixed z-50 inset-y-0 left-0 w-64 bg-[#101010] border-gray-500 border-r-2 text-white p-4">
//           <div className="flex justify-end">
//             <button className="text-2xl" onClick={toggleNavbar}>
//               &#10005;
//             </button>
//           </div>
//           <div>
//             <nav className="flex  flex-col space-y-4 mt-4">
//               <a
//                 href="/notes"
//                 className="hover:bg-[#434343] bg-[#242424] text-lg p-3 rounded"
//               >
//                 Notes
//               </a>
//               <a
//                 href="/routine"
//                 className="hover:bg-[#434343] bg-[#242424] text-lg p-3 rounded"
//               >
//                 Routine
//               </a>
//               <a
//                 href=""
//                 className="hover:bg-[#434343] bg-[#242424] text-lg p-3 rounded"
//               >
//                 Passwords
//               </a>
//             </nav>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import usercontext from "../context/userContext";
import { Toaster, toast } from "react-hot-toast";
import logo from "../assets/android-chrome-192x192.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useContext(usercontext);
  
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-[#101010] text-white">
        <Toaster />
        <div className="flex items-center">
          <span className="text-3xl cursor-pointer" onClick={toggleNavbar}>
            &#9776;
          </span>
        </div>
        <div className="opacity-0 lg:opacity-100 text-center flex text-2xl italic space-x-2">
          <img src={logo} alt="logo" className="w-10 h-10 "></img>
          <span className="">
            My<span className="text-4xl">V</span>ault
          </span>
        </div>

        {!session?.success ? (
          <Link to="/signup">
            <button className="animated-button">
              <svg
                viewBox="0 0 24 24"
                className="arr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
              <span className="text">Sign in</span>
              <span className="circle"></span>
              <svg
                viewBox="0 0 24 24"
                className="arr-1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </button>
          </Link>
        ) : (
          <button
            className="animated-button"
            onClick={() => {
              localStorage.removeItem("token");
              toast.success("Signed out.");
              setTimeout(() => {
                window.location = "/";
              }, 200);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="arr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className="text">Sign Out</span>
            <span className="circle"></span>
            <svg
              viewBox="0 0 24 24"
              className="arr-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed z-50 inset-y-0 left-0 w-64 bg-[#101010] border-gray-500 border-r-2 text-white p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between mt-3 lg:mt-0">
              <div className="opacity-100  lg:opacity-0 flex font-sans text-center ml-12 text-lg italic ">
                <img src={logo} alt="logo" className="w-8 h-8 "></img>
                <span className="">
                  &nbsp;My<span className="text-2xl">V</span>ault
                </span>
              </div>
              <button
                className="text-2xl border-2 px-1 rounded-lg"
                onClick={toggleNavbar}
              >
                &#10005;
              </button>
            </div>
            <nav className="flex flex-col space-y-4 mt-6">
              <Link
                to="/notes"
                onClick={toggleNavbar}
                className="hover:bg-[#434343] bg-[#242424] text-lg p-3 rounded"
              >
                Notes
              </Link>
              <Link
                to="/routine"
                onClick={toggleNavbar}
                className="hover:bg-[#434343] bg-[#242424] text-lg p-3 rounded"
              >
                Routine
              </Link>
              <Link
                to="/password"
                onClick={toggleNavbar}
                className="hover:bg-[#434343] bg-[#242424] text-lg p-3 rounded"
              >
                Passwords
              </Link>
            </nav>
          </div>
          <div className="border-t border-gray-500 mt-4 pt-4">
            <div className="flex flex-col space-y-2">
              {session?.success ? (
                <>
                  <p className="text-sm text-gray-400">
                    Name: {session.data.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    Email: {session.data.email}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-400">
                    Developer: Bibaswan Nandi
                  </p>
                  <p className="text-sm text-gray-400">
                    Email: nandibibaswan19@gmail.com
                  </p>
                </>
              )}
              <hr />
              <div className="flex mt-2 space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12 2.04c-5.5 0-10 4.48-10 10 0 4.4 3.59 8 8 8 3.31 0 6.31-2.1 7.45-5.13.55-.03 1.04-.23 1.48-.54-.64.1-1.29.15-1.95.15-.56 0-1.11-.05-1.64-.14.57-.12 1.1-.37 1.57-.7-.53.07-1.07.11-1.63.11-.43 0-.85-.03-1.26-.09.48-.14.93-.35 1.33-.62-.42.06-.84.1-1.27.1-.51 0-1.02-.06-1.52-.17.47-.15.9-.36 1.28-.65-.51.07-1.03.12-1.56.12-.2 0-.4-.01-.59-.03.43-.28.78-.62 1.08-1.01-.4.03-.8.06-1.22.06-.32 0-.63-.02-.94-.07.26-.28.47-.61.65-.96-.3.02-.61.04-.93.04-.2 0-.41-.01-.61-.03.2-.32.37-.66.51-1.03-.35.02-.7.03-1.06.03-.27 0-.54-.01-.81-.04.16-.25.31-.51.45-.79-.21.01-.42.02-.63.02-.3 0-.6-.02-.9-.06.17-.22.34-.44.48-.68-.18.01-.36.02-.54.02-.3 0-.59-.02-.88-.06.18-.2.34-.42.5-.64-.17.01-.34.02-.51.02-.3 0-.6-.02-.9-.07.13-.15.26-.3.37-.47.04-.02.09-.03.13-.05z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M20.947 8.305c.014.201.014.403.014.605 0 6.153-4.684 13.248-13.248 13.248-2.626 0-5.072-.77-7.125-2.095.365.043.717.058 1.098.058 2.178 0 4.186-.73 5.778-1.973-2.034-.037-3.75-1.379-4.342-3.216.289.043.578.072.886.072.418 0 .825-.058 1.21-.165-2.124-.425-3.722-2.311-3.722-4.574 0-.02 0-.036.001-.056.629.351 1.34.563 2.101.588-1.245-.83-2.061-2.253-2.061-3.863 0-.849.23-1.645.632-2.33 2.307 2.845 5.753 4.718 9.636 4.918-.079-.339-.118-.693-.118-1.052 0-2.566 2.077-4.643 4.643-4.643 1.336 0 2.544.563 3.393 1.465 1.058-.207 2.053-.595 2.948-1.126-.347 1.082-1.08 1.988-2.035 2.56 1.08-.127 2.109-.416 3.063-.843-.713 1.06-1.613 1.989-2.652 2.726z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M21.6 5.4h-2.4c0-1.3-1.1-2.4-2.4-2.4h-9.6c-1.3 0-2.4 1.1-2.4 2.4h-2.4c-1.1 0-2.1.9-2.1 2.1v12c0 1.1.9 2.1 2.1 2.1h2.4c0 1.3 1.1 2.4 2.4 2.4h9.6c1.3 0 2.4-1.1 2.4-2.4h2.4c1.1 0 2.1-.9 2.1-2.1v-12c0-1.2-.9-2.1-2.1-2.1zm-9.6 12h-4.8c-.3 0-.6-.3-.6-.6v-4.8c0-.3.3-.6.6-.6h4.8c.3 0 .6.3 .6.6v4.8c0 .3-.3.6-.6.6zm5.4 0h-2.4c-.3 0-.6-.3-.6-.6v-4.8c0-.3.3-.6.6-.6h2.4c.3 0 .6.3 .6.6v4.8c0 .3-.3.6-.6.6zm1.2-12h-12v2.4h12v-2.4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
