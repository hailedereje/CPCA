import { Outlet } from "react-router-dom";
import CreateButton from "@/components/CreateButton";
import Sidebar from "@/components/ForumSidebar";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSocket,addUsers } from "@/features/forum/socketSlice";
import { QueryClient, QueryClientProvider } from "react-query";
import SocketContext from "@/context/SocketContext";

const queryClient = new QueryClient();

export const socket = io("http://localhost:5000", {
  withCredentials: true,
  secure: true,
});

export const Layout = () => {
  const user = useSelector((state) => state.userState.user);
  const users = useSelector((state) => state.socketState.onlineUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("socket", socket)
    dispatch(setSocket(socket))
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

    return () => {
      socket.disconnect();
    };
  },[dispatch, user]);


  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div
          className="w-full flex justify-between items-start px-4 
        md:px-12 pt-12 dark:bg-[#32353F]"
        >
          <Sidebar />
          <SocketContext.Provider value={socket}>
            <Outlet />  
          </SocketContext.Provider>
          <div
            className="right-section
          hidden md:block fixed z-10 top-24 right-28"
          >
            <CreateButton />
            <div
              className="mt-8  py-4 px-3 rounded-md flex
         flex-col items-start gap-5"
            >
              <h2 className="text-gray-600 font-bold text-start">Top Users</h2>
              {users.length > 0 &&
                users.slice(0, 5).map((user, index) => {
                  console.log("user", user);
                  return (
                    <div key={index} className="flex items-center cursor-pointer">
                      <img
                        src={user?.profileImage}
                        alt="profile"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <h3 className="text-xs">{user.name}</h3>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
    </QueryClientProvider>  
  );
};

export default Layout;
