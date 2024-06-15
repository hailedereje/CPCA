import { useState, useEffect } from "react";
import newRequests from "@/utils/newRequest";
import { FaSearch } from "react-icons/fa";
import { AddInstructor } from ".";
import { MenuWrapper } from "@/components/createCourse/components/courseDrawer";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import Confirmation from "@/components/createCourse/components/confirmationDialog";
import { useDispatch } from "react-redux";
import { openConfirmationDialog } from "@/features/course/coursSidebarSlice";
import { ActionTypes } from "@/components/createCourse/action.Types";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch()

  const {data: listOfUsers ,isSuccess } = useQuery({
    queryKey: ["users", currentPage, searchTerm, roleFilter],
    queryFn: async () => {
      const response = await newRequests.get("/user/all", {
        params: {
          page: currentPage,
          search: searchTerm,
          role: roleFilter,
        },
      
      });
      return response.data;
    },
    staleTime: 1000*60*500,
    retry:3,
    refetchInterval:false
  })

  useEffect(() => {
    if(isSuccess){
      setUsers(listOfUsers.users);
      setTotalPages(listOfUsers.totalPages);
    }

  }, [isSuccess, currentPage, roleFilter, searchTerm, listOfUsers]);

  const handleDetails = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const handleCloseModal = () => {
    setShowDetails(false);
    setSelectedUser(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 flex items-center justify-center rounded-full border ${currentPage === i ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col w-full p-4">
      <Confirmation />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Users List</h2>
        <AddInstructor />
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by username or email"
            className="input w-full p-2 border border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>
        <select
          value={roleFilter}
          onChange={handleRoleChange}
          className="select border border-gray-400 w-full md:w-1/3 p-2 rounded-lg focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-500 text-white rounded">
              <th className="p-4 text-center border border-gray-200 text-lg font-semibold">NO.</th>
              <th className="p-4 border border-gray-200 text-lg font-semibold">Username</th>
              <th className="p-4 border border-gray-200 text-lg font-semibold">Email</th>
              <th className="p-4 border border-gray-200 text-lg font-semibold">Role</th>
              <th className="p-4 border border-gray-200 text-lg font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                <td className="p-4 text-center border border-gray-200">{index + 1}</td>
                <td className="p-4 border border-gray-200">{user.username}</td>
                <td className="p-4 border border-gray-200">{user.email}</td>
                <td className="p-4 border border-gray-200">{user.role}</td>
                <td className="p-4 flex justify-center gap-2 border border-gray-200">
                  <MenuWrapper>
                    <li onClick={() => handleDetails(user)} className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-200 rounded-lg">
                    <span className="mr-2"><MdModeEditOutline /></span>
                    <span className='text-sm capitalize'>details</span>
                    </li>
                    <li onClick={() => dispatch(openConfirmationDialog({ userId:user._id, message:"are you sure you want to delete the user",actionType:ActionTypes.DELETE_USER}))} className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-200 rounded-lg">
                      <span className="mr-2"><RiDeleteBin6Line className="text-red-400" /></span>
                      <span className='text-sm capitalize'>delete</span>
                    </li>
                  </MenuWrapper>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-full border ${currentPage === 1 ? 'cursor-not-allowed text-gray-300' : 'text-blue-500'}`}
          >
            &lt;
          </button>
          <div className="flex gap-2">{renderPageNumbers()}</div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 flex items-center justify-center rounded-full border ${currentPage === totalPages ? 'cursor-not-allowed text-gray-300' : 'text-blue-500'}`}
          >
            &gt;
          </button>
        </div>
      </div>
      {showDetails && (
  <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
    <div className="modal-content bg-white w-full md:w-2/3 lg:w-1/2 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out scale-95">
      <button
        className="absolute top-3 right-3 text-2xl text-red-600 hover:text-red-800 transition duration-150"
        onClick={handleCloseModal}
      >
        &times;
      </button>
      <h3 className="text-2xl font-bold mb-6 text-center">User Details</h3>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <strong className="text-lg">Username:</strong>
          <span className="bg-gray-100 p-2 rounded-md w-full text-gray-700">{selectedUser.username}</span>
        </div>
        <div className="flex items-center space-x-4">
          <strong className="text-lg">Email:</strong>
          <span className="bg-gray-100 p-2 rounded-md w-full text-gray-700">{selectedUser.email}</span>
        </div>
        <div className="flex items-center space-x-4">
          <strong className="text-lg">Role:</strong>
          <span className="bg-gray-100 p-2 rounded-md w-full text-gray-700">{selectedUser.role}</span>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default UsersList;
