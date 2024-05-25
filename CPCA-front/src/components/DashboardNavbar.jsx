import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, toggleSidebar, toggleTheme } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";

function DashboardNavbar() {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Betsegaw invited you to take the course",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      message: "Congratulations you completed advanced js course",
      time: "5 minutes ago",
      read: false,
    },
  ]);
  const toggle = () => {
    // console.log('toggled')
    dispatch(toggleSidebar());
  };

  const theme = useSelector((state) => state.userState.theme);
  const isDarkTheme = theme === "dracula";

  console.log(theme);
  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
  };

  // console.log(user);
  return (
    <div className="navbar bg-base-100 border-b border-base-200  shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div className="btn btn-ghost btn-circle" onClick={toggle}>
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Dashboard</a>
      </div>
      <div className="navbar-end">
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
        <button className="btn ml-3 btn-ghost btn-circle">
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
        </button>
        <button className="" onClick={() => setShowLogout(!showLogout)}>
          <img
            className=" object-contain mask mask-circle btn"
            src={user.profileImg}
            alt="profileImg"
          />
        </button>
        {showLogout && (
          <div>
            <button className="btn btn-ghost" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardNavbar;
