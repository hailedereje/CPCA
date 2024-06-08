import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AdminLinks, InstructLinks, StudentLinks } from "@/utils/links";
import Notifications from "@/components/Notification";
import { logoutUser } from "@/features/user/userSlice";

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [count, setCount] = useState(0);
  const { user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNotificationCount = (count) => {
    setCount(count);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <>
      <div className="flex flex-col  h-screen">
        <div className="flex justify-between gap-3 h-12 items-center fixed top-0 z-10 shadow-md w-full p-2 bg-white">
          <DropdownMenu />
          <div className="">Dashboard</div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  className="btn btn-ghost btn-circle"
                  onClick={() => setToggleNotification(!toggleNotification)}
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
                    <span className="badge badge-xs bg-red-500 indicator-item text-white">
                      {count}
                    </span>
                  </div>
                </button>
                <div
                  className={`absolute right-0 w-96 ${
                    toggleNotification ? "block" : "hidden"
                  }`}
                >
                  <Notifications
                    onNotificationCount={handleNotificationCount}
                  />
                </div>
              </div>
              {user && (
                <div onClick={toggleDropdown} className="relative">
                  <img
                    src={user.profileImg}
                    alt="profile"
                    className="w-10 h-10 rounded-full mr-2 cursor-pointer"
                  />
                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 ${
                      dropdownOpen ? "block" : "hidden"
                    }`}
                  >
                    <div
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex h-full  pt-14">
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
    <div className="relative inline-block">
      <button className="" onClick={() => setIsMenuOpen((prev) => !prev)}>
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
        <div className="absolute top-10 left-0 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 dark:bg-gray-600 dark:text-white dark:border-black">
          <ul className="list-none p-0 m-0">
            {sidebarlinks.map((link) => (
              <li
                key={link.id}
                className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                onClick={() => {
                  navigate(link.path);
                  setIsMenuOpen(false);
                }}
              >
                <span className="mr-2">{link.icon}</span>
                {link.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
