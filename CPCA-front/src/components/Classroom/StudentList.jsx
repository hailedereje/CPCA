import React, { useState } from "react";
import { FiList, FiGrid, FiUserPlus, FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const StudentList = ({ students }) => {
  const [view, setView] = useState("detailed");

  const toggleView = (view) => {
    setView(view);
  };

  return (
    <div className="mt-4 p-4">
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
      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-300 rounded-lg p-8 text-center">
          <FiUsers className="text-6xl text-gray-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">No Students Found</h2>
          <p className="text-gray-600">No Students have been invited yet.</p>
        </div>
      ) : view === "detailed" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
          {students.map((student) => (
            <NavLink to={`${student._id}`} key={student._id}>
              <article className="border border-base-200 shadow-sm p-4 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div className="flex flex-col items-center bg-white p-4 ">
                  <img
                    src={student.profileImg || "https://via.placeholder.com/150"}
                    alt={student.username}
                    className="h-24 w-24 rounded-lg object-cover mb-4"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">{student.fullName || ""}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{student.email || ""}</p>
                    <p className="text-gray-600 dark:text-gray-400">{student.studentId || ""}</p>
                    <p className="text-gray-600 dark:text-gray-400">{student.username || ""}</p>
                    <p className="text-gray-600 dark:text-gray-400">{student.phoneNumber || ""}</p>
                    <p className="text-gray-600 dark:text-gray-400">{student.bio || ""}</p>
                  </div>
                </div>
              </article>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Student ID</th>
                <th>Username</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="items-center">
                  <td>
                    <NavLink to={`${student._id}`}>
                      <img
                        src={student.profileImg || "https://via.placeholder.com/150"}
                        alt={student.username}
                        className="h-10 w-10 rounded-lg object-cover mr-4"
                      />
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`${student._id}`}>
                      {student.fullName || "N/A"}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`${student._id}`}>
                      {student.email || "N/A"}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`${student._id}`}>
                      {student.studentId || "N/A"}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`${student._id}`}>
                      {student.username || "N/A"}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`${student._id}`}>
                      {student.phoneNumber || "N/A"}
                    </NavLink>
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

export default StudentList;
