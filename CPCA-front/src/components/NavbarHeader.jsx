import React from "react";
import { NavLink } from "react-router-dom";
function NavbarHeader() {
  return (
    <NavLink
      to="/"
      className="h-[5rem] text-3xl  flex items-center pl-[2.5rem]">
      LOGO
    </NavLink>
  );
}

export default NavbarHeader;
