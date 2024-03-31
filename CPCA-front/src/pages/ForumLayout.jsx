import Content from "./components/Content";
import CreateButton from "./components/CreateButton";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Askquestion from "./components/Askquestion";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./pages/Chat";
import MyQuestions from "./pages/MyQuestions";
import Explore from "./pages/Explore";
import Notfound from "./components/Notfound";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addUsers } from "./context/onlineSlice";
const queryClient = new QueryClient();

export const socket = io("http://localhost:5000", {
  withCredentials: true,
  secure: true,
});

export const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/login";
    }

    socket.connect();
    socket.on("connect", () => {
      console.log("socket connected");
    });
    socket.auth = user;

    socket.on("user-connected", (users) => {
      console.log("users", users);

      dispatch(addUsers(users));
    });

    socket.on("user-disconnected", (users) => {
      console.log("users", users);
      dispatch(addUsers(users));
    });
  },[dispatch]);

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div
        className="relative w-screen flex flex-col justify-center items-center 
      overflow-x-hidden bg-white dark:bg-[#32353F]"
      >
        <div
          className="w-full h-screen flex justify-center items-start px-4 
        md:px-12 pt-12 dark:bg-[#32353F]"
        >
          <Outlet />
          <div
            className="right-section
          hidden md:block
          h-80 fixed z-10 top-24 right-28"
          >
            <CreateButton />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};


