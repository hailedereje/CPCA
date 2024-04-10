import React from "react";
import { Header, Navbar } from "../components";

import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
