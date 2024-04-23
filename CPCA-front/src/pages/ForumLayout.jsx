import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import CreateButton from "@/components/CreateButton";
import { addUsers } from "@/onlineSlice";
const queryClient = new QueryClient();

export const socket = io("http://localhost:5000", {
  withCredentials: true,
  secure: true,
});

export const Layout = () => {
  const user = useSelector((state) => state.userState.user);
  console.log("user", user)
  const dispatch = useDispatch();

  useEffect(() => {
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
  },[dispatch, user]);

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

export default Layout;
