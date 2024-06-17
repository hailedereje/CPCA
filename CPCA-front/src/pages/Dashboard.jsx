import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AdminLinks, InstructLinks, StudentLinks } from "@/utils/links";
import Notifications from "@/components/Notification";
import { logoutUser as logoutUserAction } from "@/features/user/userSlice";
import blankProfile from "@/assets/blank_profile.webp";
import logo from "@/assets/logo.png";
import newRequests from "@/utils/newRequest";
import { useLogoutUserMutation } from "@/api";
import MyChatBot from "@/components/chatbot/chat";

function Dashboard() {
  const location = useLocation();
  const path = location.pathname.split("/").filter((path) => path !== "");
  const [logoutUser, { isLoading, isSuccess, error }] = useLogoutUserMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [count, setCount] = useState(0);
  const { user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      newRequests.get(`/notifications`).then((response) => {
        setCount(response.data.length);
      });
    }
  }, [user]);

  const handleNotificationCount = (count) => {
    setCount(count);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logoutUserAction());
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const QuickLinks = () => {
    const links =
      user.role === "admin"
        ? AdminLinks
        : user.role === "instructor"
        ? InstructLinks
        : StudentLinks;
    const getActive = (link) => {
      return path.includes(link);
    };
    return (
      <div className="flex space-x-4">
        {links.map((link) => (
          <div
            key={link.id}
            className={`flex items-center p-2 text-lg text-blue-900 font-medium leading-relaxed hover:text-blue-500 transition-colors cursor-pointer ${
              getActive(link) && "text-blue-400"
            }`}
            onClick={() => navigate(link.path)}
          >
            {link.text}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex justify-between gap-3 h-16 items-center fixed top-0 w-full p-4 bg-white z-40 border">
          <DropdownMenu />
          <Link to="/dashboard">
            <img src={logo} alt="logo" className="object-contain w-24" />
          </Link>
          <div className="hidden md:flex w-full h-full">
            <QuickLinks />
          </div>
          <div className="flex items-center gap-4 relative">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setToggleNotification(!toggleNotification)}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {count > 0 && (
                  <div className="">
                    <span className="badge badge-xs bg-red-500 indicator-item text-white">
                      {count}
                    </span>
                  </div>
                )}
              </div>
            </button>
            {toggleNotification && (
              <div className="absolute right-12 top-12 w-96 bg-white rounded-lg shadow-lg z-50">
                <Notifications onNotificationCount={handleNotificationCount} />
              </div>
            )}
            {user && (
              <div className="relative w-full">
                <img
                  src={user.profileImg || blankProfile}
                  alt="profile"
                  className="w-10 object-cover flex items-center rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md border shadow-sm">
                    <div
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 pt-16 bg-gray-200">
        <MyChatBot />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

const DropdownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();

  const sidebarlinks =
    user.role === "instructor"
      ? InstructLinks
      : user.role === "admin"
      ? AdminLinks
      : StudentLinks;

  return (
    <div className="relative inline-block md:hidden text-black">
      <button onClick={() => setIsMenuOpen((prev) => !prev)}>
        <svg
          className="w-7"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M.5 9h9.75v1.25H.5zm0-3.25h15V7H.5zm0 6.5h15v1.25H.5zm0-9.75h9.75v1.25H.5z"
          />
        </svg>
      </button>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      {isMenuOpen && (
        <div className="absolute top-10 left-0 w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
          <ul className="list-none p-0 m-0">
            {sidebarlinks.map((link) => (
              <li
                key={link.id}
                className="px-4 py-2 flex items-center cursor-pointer hover:bg-blue-50"
                onClick={() => {
                  navigate(link.path);
                  setIsMenuOpen(false);
                }}
              >
                {link.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
