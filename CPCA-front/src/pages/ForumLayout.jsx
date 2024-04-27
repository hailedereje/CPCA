import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CreateButton from "@/components/CreateButton";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "@/onlineSlice";
import SocketContext from "@/context/SocketContext";

export const socket = io("http://localhost:5000", {
  withCredentials: true,
  secure: true,
});

const queryClient = new QueryClient();

export const Layout = () => {
  const user = useSelector((state) => state.userState.user);
  console.log("user", user)
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("socket connected", socket.id);
    });
    socket.auth = user;
    socket.on("user-connected", (users) => {
      dispatch(addUsers(users));
      console.log("users", users);
    });

    socket.on("user-disconnected", (users) => {
      console.log("users", users);
      dispatch(addUsers(users));
    });

    // Clean up the effect by disconnecting the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  },[dispatch, user]);

  return (
    <SocketContext.Provider value={socket}>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div
        className="relative w-full flex flex-col justify-center items-center 
      overflow-x-hidden bg-white dark:bg-[#32353F]"
      >
        <div
          className="w-full flex flex-col justify-center items-start px-4 
        md:px-12 pt-12 dark:bg-[#32353F]"
        >
          <Outlet />
          <div
            className="right-section
          hidden md:block fixed z-10 top-24 right-28"
          >
            <CreateButton />
          </div>
        </div>
      </div>
    </QueryClientProvider>
    </SocketContext.Provider>
  );
};

export default Layout;
