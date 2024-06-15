import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Navbar({ transparent }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const user = useSelector((state) => state.userState.user);
  
  const navLinkClass = (baseClass) =>
    `${transparent ? "lg:text-white lg:hover:text-gray-300 text-gray-800" : "text-gray-800 hover:text-gray-600"} ${baseClass}`;
    
  return (
    <nav className={`${transparent ? "top-0 absolute z-50 w-full" : "relative bg-white shadow-lg"} flex flex-wrap items-center justify-between px-2 py-3`}>
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <button
          className="text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className={`lg:flex flex-grow items-center ${navbarOpen ? "block rounded shadow-lg" : "hidden"}`} id="navbar">
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {["facebook", "twitter", "github"].map((platform) => (
              <li key={platform} className="flex items-center">
                <a href="#pablo" className={navLinkClass("px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold")}>
                  <i className={`${transparent ? "lg:text-gray-300 text-gray-500" : "text-gray-500"} fab fa-${platform} text-lg leading-lg`} />
                  <span className="lg:hidden inline-block ml-2 capitalize">{platform}</span>
                </a>
              </li>
            ))}
            {!user && (
              <li className="flex items-center">
                <NavLink to="/login" className={(" text-black/80 bg-white  text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3")} style={{ transition: "all .15s ease" }}>
                  Login / Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
