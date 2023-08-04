import React, { useState } from "react";

import Menu from "./Menu";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <nav className="bg-gradient-to-r from-rose-700 to-red-700 font-normal">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        <div className="text-white flex-shrink-0 font-bold flex flex-row items-center tracking-wider">
          <div>DnD Group Finder</div>
        </div>
        <div className="hidden md:block">
          <Menu />
        </div>
        <button
          type="button"
          className="md:hidden bg-rose-600 inline-flex items-center justify-center p-2 rounded-md text-black  hover:bg-rose-800 focus:outline-none focus:bg-rose-800 transition duration-150 ease-in-out"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <svg
            className="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="md:hidden">{showMobileMenu && <Menu />}</div>
    </nav>
  );
}

export default Navbar;
