import React from "react";
import { Header, Navbar, About, ContactSection, Courses } from "../components";

import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
      <About />
      {/* <Courses /> */}
      <ContactSection />
    </div>
  );
}

export default HomeLayout;
