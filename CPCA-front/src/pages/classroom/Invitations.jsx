import { useEffect, useState } from "react";
import { FiList, FiGrid, FiUserPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import newRequests from "@/utils/newRequest";

const InvitationList = () => {
  const [invitations, setInvitations] = useState([]);
  const [view, setView] = useState("detailed");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const { classroom } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectToInvite = () => {
    const pathSegments = location.pathname.split('/');
    pathSegments.pop();
    const newPath = `${pathSegments.join('/')}/students/invite`;
    navigate(newPath);
  };

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await newRequests.get(`/classroom/invitations/${classroom._id}`);
        setInvitations(response.data);
      } catch (error) {
        console.error("Failed to fetch invitations:", error);
        toast.error("Failed to load invitations. Please try again later.");
      }
    };

    fetchInvitations();
  }, [classroom._id]);

  const toggleView = (view) => {
    setView(view);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDelete = async (email) => {
    try {
      await newRequests.delete(`/classroom/invitations/${classroom._id}/${email}`);
      setInvitations(prev => prev.filter(invitation => invitation.email !== email));
      toast.success("Invitation deleted successfully.");
    } catch (error) {
      console.error("Failed to delete invitation:", error);
      toast.error("Failed to delete invitation. Please try again later.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStudentsPerPageChange = (e) => {
    setStudentsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing students per page
  };

  const filteredInvitations = invitations.filter((invitation) => {
    const matchesSearch = searchTerm === "" || invitation.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || (statusFilter === "accepted" ? invitation.accepted : !invitation.accepted);
    return matchesSearch && matchesStatus;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentInvitations = filteredInvitations.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredInvitations.length / studentsPerPage);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button
            className={`btn btn-primary btn-sm ${view === "detailed" && "btn-active"}`}
            onClick={() => toggleView("detailed")}
          >
            <FiGrid className="mr-2" />
            Detailed View
          </button>
          <button
            className={`btn btn-primary btn-sm ${view === "table" && "btn-active"}`}
            onClick={() => toggleView("table")}
          >
            <FiList className="mr-2" />
            Table View
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by email or username"
              className="input input-bordered input-sm pr-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FiSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <select
            className="select select-bordered select-sm"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="">All Statuses</option>
            <option value="accepted">Accepted</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <button onClick={redirectToInvite} className="btn btn-success btn-sm">
          <FiUserPlus className="mr-2" />
          Invite User
        </button>
      </div>
      <div className="mb-4 flex justify-end items-center space-x-2">
        <label>Students per page:</label>
        <select
          className="select select-bordered select-sm"
          value={studentsPerPage}
          onChange={handleStudentsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      {view === "detailed" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
          {currentInvitations.map((invitation) => (
            <article
              key={invitation.email}
              className="border border-base-200 shadow-sm p-4 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{invitation.email}</h3>
                  <span className={`mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${invitation.accepted ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {invitation.accepted ? "Accepted" : "Pending"}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(invitation.email)}
                  className="btn btn-error btn-sm"
                >
                  <FiTrash2 />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentInvitations.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500">
                    No Invitations Found
                  </td>
                </tr>
              )}
              {currentInvitations.map((invitation) => (
                <tr key={invitation.email}>
                  <td>{invitation.email}</td>
                  <td>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${invitation.accepted ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                      {invitation.accepted ? "Accepted" : "Pending"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(invitation.email)}
                      className="btn btn-info btn-sm"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`btn btn-sm ${currentPage === index + 1 ? "btn-active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InvitationList;
