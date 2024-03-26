// BigSidebar.js
import React from "react";
import { useSelector } from "react-redux";
import NavbarHeader from "./NavbarHeader";
import NavLinks from "./NavLinks";
import { InstructLinks, StudentLinks } from "../utils/links";
const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.userState);
  return (
    <div
      className={`bg-base-100 border-r border-base-200 shadow-md w-[250px] transition-all duration-300 ease-in-out h-screen ${
        isSidebarOpen ? "ml-0" : "-ml-[250px]"
      }`}
    >
      <NavbarHeader />
      <div className="pt-[2rem]">
        <NavLinks links={InstructLinks} />
      </div>
    </div>
  );
};

export default BigSidebar;
