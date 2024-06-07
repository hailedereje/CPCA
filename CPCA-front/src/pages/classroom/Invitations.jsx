import { useEffect, useState } from "react";
import { FiList, FiGrid, FiUserPlus } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import newRequests from "@/utils/newRequest";

const InvitationList = () => {
  const [invitations, setInvitations] = useState([]);
  const [view, setView] = useState("detailed");

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await newRequests.get("/classroom/invitations/all");
        setInvitations(response.data);
      } catch (error) {
        console.error("Failed to fetch invitations:", error);
        toast.error("Failed to load invitations. Please try again later.");
      }
    };

    fetchInvitations();
  }, []);

  const toggleView = (view) => {
    setView(view);
  };

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
        <NavLink to={"invite"} className="btn btn-success btn-sm">
          <FiUserPlus className="mr-2" />
          Invite User
        </NavLink>
      </div>
      {view === "detailed" ? (
        <ul className="space-y-2">
          {invitations.map((invitation) => (
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
              </tr>
            </thead>
            <tbody>
              {invitations.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center text-gray-500">
                    No Invitations Found
                  </td>
                </tr>
              )}
              {invitations.map((invitation) => (
                <tr key={invitation.email}>
                  <td>{invitation.email}</td>
                  <td>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${invitation.accepted ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                      {invitation.accepted ? "Accepted" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvitationList;
