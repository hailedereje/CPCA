import { useEffect, useState } from "react";
import { FiList, FiGrid, FiUserPlus } from "react-icons/fi";
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
            className="btn btn-primary btn-sm"
            onClick={() => toggleView("detailed")}
          >
            <FiGrid className="mr-2" />
            Detailed View
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => toggleView("table")}
          >
            <FiList className="mr-2" />
            Table View
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search by email or username"
            className="input input-bordered input-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
      <div className="mb-4 flex justify-end">
        <label className="mr-2">Students per page:</label>
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
        <ul className="space-y-2">
          {currentInvitations.map((invitation) => (
            <article
              key={invitation.email}
              className="flex border border-base-200 shadow-sm items-center flex-col gap-y-4 sm:flex-row flex-wrap p-3"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {invitation.email}
                </h3>
                <span className={`mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${invitation.accepted ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                  {invitation.accepted ? "Accepted" : "Pending"}
                </span>
              </div>
              <button
                onClick={() => handleDelete(invitation.email)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </article>
          ))}
        </ul>
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
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`btn btn-sm mx-1 ${currentPage === index + 1 ? "btn-active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InvitationList;
