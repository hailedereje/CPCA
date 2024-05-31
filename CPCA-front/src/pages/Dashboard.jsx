import React, { useState } from "react";
import { BigSidebar, DashboardNavbar, SubmitBtn } from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequests from "@/utils/newRequest";
import { Loading } from "@/components/createCourse/components/loader";
import { IoMdNotifications } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { useSelector } from "react-redux";
import { AdminLinks, InstructLinks, StudentLinks } from "@/utils/links";
// import { QueryClient, QueryClientProvider } from "react-query";

function Dashboard() {
    const [openSidebar,setOpenSidebar] = useState(false)
    
  // const {isLoading } = useQuery({
  //   queryKey:['courseListFilter'],
  //   queryFn: () => newRequests.get("/courses/courseListFilter"),
  //   staleTime: 1000 * 6 * 600, 
  // })

  return (
    <>
      <div className="flex flex-col space-y-12 dark:text-white">
        <div className="flex justify-between gap-3 h-12 items-center fixed top-0 z-20 shadow-md w-full p-2 bg-white dark:bg-[#212121]">
          <DropdownMenu/>
          <div className="">
            Admin Dashboard
          </div>
          <div className="flex gap-3">
            <IoMdNotifications size={20}/>
            <MdDarkMode size={20}/>
          </div>
        </div>
        <div className="flex w-full items-center justify-center dark:bg-[#212121]">
          <Outlet/>
        </div> 
      </div>
    </>
  );
}
export default Dashboard;


const DropdownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate()

  const sidebarlinks =
    user.role === "instructor"
      ? InstructLinks
      : user.role === "admin"
      ? AdminLinks
      : StudentLinks;

  return (
    <div className="relative inline-block">
      <button className="" onClick={() => setIsMenuOpen(prev => !prev)}>
            <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path fill="currentColor" d="M.5 9h9.75v1.25H.5zm0-3.25h15V7H.5zm0 6.5h15v1.25H.5zm0-9.75h9.75v1.25H.5z" />
            </svg>
          </button>
      {isMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)}></div>
      )}
      {isMenuOpen && (
        <div className="absolute top-10 left-0 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 dark:bg-gray-600 dark:text-white dark:border-black">
          <ul className="list-none p-0 m-0">
          {sidebarlinks.map(link => (
              <li
                key={link.id}
                className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                onClick={() => {
                  navigate(link.path)
                  setIsMenuOpen(false)
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

