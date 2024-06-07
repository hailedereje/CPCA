import { logoutUser, toggleTheme } from "@/features/user/userSlice";
import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.userState);
  const theme = useSelector((state) => state.userState.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const isDarkTheme = theme === "dark";

  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
  };

  return (
    <header className="fixed top-0 z-50 w-screen bg-white dark:bg-gray-800 dark:text-white p-4 border border-gray-200">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">CPCA</h1>
        </div>
        <nav className="flex items-center space-x-4">
          <NavLink
            to="/courses"
            className="hover:text-gray-400 dark:hover:text-gray-300"
          >
            Courses
          </NavLink>
          <NavLink
            to="/category"
            className="hover:text-gray-400 dark:hover:text-gray-300"
          >
            Category
          </NavLink>
          <NavLink
            to="/practice_question"
            className="hover:text-gray-400 dark:hover:text-gray-300"
          >
            Practice Questions
          </NavLink>
          <NavLink
            to="/quiz_question"
            className="hover:text-gray-400 dark:hover:text-gray-300"
          >
            Quiz Questions
          </NavLink>
        </nav>
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full dark:text-white focus:outline-none w-96"
          />
          <FaSearch className="absolute right-3 top-3 dark:text-white" />
        </div>
        <div className="flex items-center">
          <button className="btn ml-3 btn-ghost btn-circle">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                onChange={handleTheme}
                defaultChecked={isDarkTheme}
              />
              <BsSunFill className="swap-on h-4 w-4" />
              <BsMoonFill className="swap-off h-4 w-4" />
            </label>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          {user ? (
            <div onClick={toggleDropdown} className="relative">
              <img
                className="object-contain mask mask-circle btn"
                src={user.profileImg}
                alt="profileImg"
              />
              <div
                className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 ${
                  dropdownOpen ? "block" : "hidden"
                }`}
              >
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Dashboard
                </NavLink>
                <div
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/login"
                className="hover:text-gray-400 dark:hover:text-gray-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="hover:text-gray-400 dark:hover:text-gray-300"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
