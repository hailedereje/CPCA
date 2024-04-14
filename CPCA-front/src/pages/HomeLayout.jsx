import React from "react";
import { Header, Navbar, About, ContactUs, Courses } from "../components";

import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
      <About />
      {/* <Courses /> */}
      <ContactUs />
    </div>
  );
}

export default HomeLayout;
