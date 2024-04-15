import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, toggleTheme } from "../features/user/userSlice";
import { BsSunFill, BsMoonFill, BsList } from "react-icons/bs";
import logo from "../assets/logo.svg";
function Header() {
  const user = useSelector((store) => store.userState.user);
  const theme = useSelector((store) => store.userState.theme);
  console.log(theme);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDarkTheme = theme === "dracula";
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`py-5`}>
      <div className="max-w-sc1.5remreen-xl mx-auto px-6 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className=" flex items-center space-x-3">
              <img src={logo} className="h-8" alt="Flowbite Logo" />
              <span className="self-center text-xl  font-semibold whitespace-nowrap  sm:text-3xl">
                Code
              </span>
            </Link>
          </div>
          <div className="hidden sm:flex items-center flex-grow justify-center">
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="/"
                  className="font-sans hover:font-serif text-xl font-medium p-3 pl-8 pr-8 hover:active:text-green-1 shadow-lg rounded-md"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-sans hover:font-serif text-xl font-medium p-3 pl-8 pr-8 hover:active:text-green-1 shadow-lg rounded-md"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="font-sans hover:font-serif text-xl font-medium p-3 pl-8 pr-8 hover:active:text-green-1 shadow-lg rounded-md"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-sans hover:font-serif text-xl font-medium p-3 pl-8 pr-8 hover:active:text-green-1 shadow-lg rounded-md"
                >
                  Contact
                </Link>
              </li>{" "}
            </ul>
          </div>
          <div className="flex items-center">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                onChange={handleTheme}
                defaultChecked={isDarkTheme}
              />
              {/* sun icon*/}
              <BsSunFill className="swap-on h-4 w-4" />
              {/* moon icon*/}
              <BsMoonFill className="swap-off h-4 w-4" />
            </label>

            {user ? (
              <div className="flex gap-x-2 sm:gap-x-8 items-center">
                <p className="text-xs sm:text-xl">Hello, {user.username}</p>
                <button
                  className="btn btn-xs btn-outline btn-primary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn flex items-center text-white p-2 sm:p-3 text-lg sm:text-2xl ml-2 mr-2 sm:ml-8  dark:bg-green-1"
              >
                Get Started
              </Link>
            )}
            <div className="sm:hidden mt-1">
              <button onClick={handleMenuToggle}>
                <BsList className="h-6 w-6" />
              </button>
            </div>
            {/* Add the menu */}
            {isMenuOpen && (
              <ul className="sm:hidden absolute top-20 right-0  py-2 px-4 rounded shadow-lg ">
                <li>
                  <Link to="/" className="block py-1">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="block text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white py-1"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="block text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white py-1"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white py-1"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
