import { Outlet, useOutletContext } from "react-router-dom";
import CreateButton from "@/components/forum/CreateButton";
import Sidebar from "@/components/forum/ForumSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { addUsers } from "@/features/forum/socketSlice";
import { QueryClient, QueryClientProvider } from "react-query";
import SocketContext from "@/context/DiscussionContext";

const queryClient = new QueryClient();

export const Layout = () => {
  const user = useSelector((state) => state.userState.user);
  const socket = useContext(SocketContext);
  const users = useSelector((state) => state.socketState.onlineUsers);
  const dispatch = useDispatch();
  const {classroom} = useOutletContext()
  useEffect(() => {
    if(socket){
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
    }
  }, [dispatch, socket, user]);

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div
        className="flex justify-between items-start px-10"
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
                      src={user.profileImg}
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <h3 className="text-md">{user.username}</h3>
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
