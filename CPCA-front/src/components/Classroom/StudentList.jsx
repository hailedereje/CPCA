import React, { useState } from "react";
import { FiList, FiGrid, FiUserPlus } from "react-icons/fi";
import { NavLink, Link } from "react-router-dom";

const StudentList = ({ students }) => {
  const [view, setView] = useState("detailed");

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
          Invite Student
        </NavLink>
      </div>
      {view === "detailed" ? (
        <ul className="space-y-2">
          {students.map((student, index) => (
            <NavLink to={`${student._id}`}  key={student._id}>
              <article
                className="flex border border-base-200 shadow-sm items-center flex-col gap-y-4 sm:flex-row flex-wrap p-3 hover:bg-gray-100 transition"
              >
                <img
                  src={student.profileImg || "https://via.placeholder.com/150"}
                  alt={student.username}
                  className="h-24 w-24 rounded-lg object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {student.fullName || "N/A"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {student.email || "N/A"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {student.phoneNumber || "N/A"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {student.studentId || "N/A"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {student.username || "N/A"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {student.bio || "N/A"}
                  </p>
                  <span className="mt-2 inline-block px-3 py-1 text-sm font-semibold bg-blue-500 text-white rounded-full">
                    {student.role || "N/A"}
                  </span>
                </div>
              </article>
            </NavLink>
          ))}
        </ul>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Student ID</th>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500">
                    No Students Found
                  </td>
                </tr>
              )}
              {students.map((student) => (
                <tr key={student._id}>
                  <td>
                    <Link to={`${student._id}`} className="text-blue-500 hover:underline">
                      {student.fullName || "N/A"}
                    </Link>
                  </td>
                  <td>{student.email || "N/A"}</td>
                  <td>{student.phoneNumber || "N/A"}</td>
                  <td>{student.studentId || "N/A"}</td>
                  <td>{student.username || "N/A"}</td>
                  <td>{student.role || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
