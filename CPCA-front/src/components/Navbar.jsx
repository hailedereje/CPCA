import React from "react";
import { NavLink } from "react-router-dom";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleTheme } from "../features/user/userSlice";

function Navbar() {
  const theme = useSelector((state) => state.userState.theme);
  console.log(theme);
  const dispatch = useDispatch();
  const isDarkTheme = theme === "dracula";

  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <nav className="bg-base-200 mt-10">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE */}
          <NavLink
            to="/login"
            className="hidden text-white lg:flex btn bg-green-1 text-3xl items-center"
          >
            Learn with us
          </NavLink>
          {/* DROPDOWN */}
          <NavLink className="dropdown" to="/login">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              {/* <NavLinks /> */}
            </ul>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">{/* <NavLinks /> */}</ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
