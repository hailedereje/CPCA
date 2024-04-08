import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.userState.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
  };

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <NavLink to = '/dashboard'
              className="btn btn-xs btn-outline btn-primary"
            >
              My Dashboard
            </NavLink>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
