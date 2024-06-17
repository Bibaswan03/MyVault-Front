// src/components/HomePage.js

import React from "react";
import "../Components/sidebar.css";
import {Link} from "react-router-dom"
function Home() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 space-y-16">
            {/* Daily Routine */}
            <div className="relative h-32  items-center bg-black p-6 rounded-lg shadow-lg">
              <div className="w-2/4"><h2 className="text-xl text-white font-semibold mb-4">
                Daily Routine
              </h2>
              <p className="text-white">Track your daily activities.</p></div>
              <Link to="/routine" className="absolute top-10 right-6 lg:right-10 "><button className="animated-button">
                <svg
                  viewBox="0 0 24 24"
                  className="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">Explore</span>
                <span className="circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  className="arr-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button></Link>
            </div>

            {/* Notes */}
            <div className="relative h-32 bg-black p-6 rounded-lg shadow-lg">
              <div className="w-1/2"><h2 className="text-xl text-white font-semibold mb-4">Notes</h2>
              <p className="text-white">Keep your notes organized.</p></div>
              <Link to="/notes" className="absolute top-10 right-6 lg:right-10 "><button className="animated-button">
                <svg
                  viewBox="0 0 24 24"
                  className="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">Explore</span>
                <span className="circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  className="arr-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button></Link>
            </div>

            {/* Passwords */}
            <div className="bg-black h-32 relative p-6 rounded-lg shadow-lg">
              <div className="w-1/2"><h2 className="text-xl text-white font-semibold mb-4">
                Passwords
              </h2>
              <p className="text-white">Securely store your passwords.</p></div>
              <Link to="/password" className="absolute top-10 right-6 lg:right-10 " ><button className="animated-button">
                <svg
                  viewBox="0 0 24 24"
                  className="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">Explore</span>
                <span className="circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  className="arr-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button></Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 My Application. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
