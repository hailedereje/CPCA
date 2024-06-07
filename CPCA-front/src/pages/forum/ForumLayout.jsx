import { Outlet, useOutletContext } from "react-router-dom";
import CreateButton from "@/components/forum/CreateButton";
import Sidebar from "@/components/forum/ForumSidebar";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUsers } from "@/features/forum/socketSlice";
import { QueryClient, QueryClientProvider } from "react-query";
import SocketContext from "@/context/DiscussionContext";

const queryClient = new QueryClient();

export const socket = io("http://localhost:5000", {
  withCredentials: true,
  secure: true,
});

export const Layout = () => {
  const user = useSelector((state) => state.userState.user);
  const users = useSelector((state) => state.socketState.onlineUsers);
  const dispatch = useDispatch();
  const {classroom} = useOutletContext()
  console.log(classroom);
  useEffect(() => {
    socket.connect();
    socket.auth = user;
    socket.on("user-connected", (users) => {
      dispatch(addUsers(users));
    });
    socket.on("user-disconnected", (users) => {
      dispatch(addUsers(users));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, user]);

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div
        className="flex justify-between items-start"
      >
        <div className="">
          <Sidebar />
        </div>
        <SocketContext.Provider value={{socket, classroomId: classroom._id}}>
          <Outlet />
        </SocketContext.Provider>
        <div className="">
          <CreateButton />
          <div
            className="mt-8  py-4 px-3 rounded-md flex
         flex-col items-start gap-5"
          >
            <h2 className="text-gray-600 font-bold text-start">Online Users</h2>
            {users.length > 0 &&
              users.map((user, index) => {
                console.log("user", user);
                return (
                  <div key={index} className="flex items-center cursor-pointer">
                    <img
                      src={user?.profileImage}
                      alt="profile"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <h3 className="text-xs">{user.username}</h3>
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
