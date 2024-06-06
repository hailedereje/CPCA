import { useState, useEffect } from "react";
import newRequests from "@/utils/newRequest";
import { FaSearch } from "react-icons/fa";
import { AddInstructor } from ".";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await newRequests.get("/user/all", {
          params: {
            page: currentPage,
            search: searchTerm,
            role: roleFilter,
          },
        });
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPage, searchTerm, roleFilter]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      newRequests
        .delete(`/users/${id}`)
        .then((res) => {
          console.log(res.data);
          setUsers((prev) => prev.filter((user) => user._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  const handelDetails = (user) => {
    setShowDetails(true);
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setShowDetails(false);
    setSelectedUser("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex w-full">
      <div className="flex w-full flex-col p-4">
        <div className="flex justify-between items-center mb-3 ">
          <h2 className="text-2xl font-bold">Users List</h2>
          <AddInstructor />
        </div>
        <div className="flex container mx-auto gap-10">
          <div className="relative w-1/2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by username or email"
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            <FaSearch className="absolute right-3 top-3 dark:text-white" />
          </div>
          <select
            value={roleFilter}
            onChange={handleRoleChange}
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          >
            <option value="">All Roles</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="w-full mt-2 overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/7 pt-2 pb-3 text-center">NO.</th>
                <th className="w-1/7 pt-2 pb-3 text-left">Username</th>
                <th className="w-2/7 pt-2 pb-3 text-left">Email</th>
                <th className="w-1/7 pt-2 pb-3 text-left">Role</th>
                <th className="w-2/7 pt-2 pb-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                  key={index}
                >
                  <td className="w-1/10 pt-2 pb-2 text-center">{index + 1}</td>
                  <td className="w-2/10 pt-2 pb-2">{user.username}</td>
                  <td className="w-3/10 pt-2 pb-2">{user.email}</td>
                  <td className="w-1/10 pt-2 pb-2">{user.role}</td>
                  <td className="w-3/10 pt-2 pb-2 flex gap-2">
                    <button
                      className="block rounded-lg bg-gradient-to-tr from-blue-800 to-blue-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => handelDetails(user)}
                    >
                      Details
                    </button>
                    <button
                      className="block rounded-lg bg-gradient-to-tr from-red-800 to-red-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center space-x-10 items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Next
          </button>
        </div>
      </div>
      {showDetails && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
          <div className="modal-overlay fixed inset-0 bg-black opacity-80 "></div>
          <div className="modal-content relative bg-white pl-6 pb-6 pr-8 rounded-lg shadow-lg">
            <span
              className="btn btn-ghost btn-circle cursor-pointer absolute text-3xl top-0 right-0 text-red-500"
              onClick={handleCloseModal}
            >
              &times;
            </span>
            <h3 className="text-xl relative inset-0 text-black font-bold my-4">
              User Details
            </h3>
            {selectedUser && (
              <div className="flex-1">
                <div className="w-full">
                  <div className="mb-4">
                    <strong>Username:</strong>
                    <pre className="bg-gray-100 p-2 rounded">
                      {selectedUser.username}
                    </pre>
                  </div>
                  <div className="mb-4">
                    <strong>Email:</strong>
                    <pre className="bg-gray-100 p-2 rounded">
                      {selectedUser.email}
                    </pre>
                  </div>
                  <div className="mb-4">
                    <strong>Role:</strong> {selectedUser.role}
                  </div>
                </div>
                <button
                    className="block rounded-lg bg-gradient-to-tr from-red-800 to-red-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={handleCloseModal}
                  >
                    Back
                  </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
