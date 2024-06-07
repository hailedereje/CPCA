import React, { useState } from "react";
import { FiUser,  FiList, FiGrid, FiUserPlus } from "react-icons/fi";
import { NavLink } from "react-router-dom";


const StudentList = ({ students }) => {


  const [view, setView] = useState("detailed");

  const toggleView = (view) => {
    setView(view);
  };

  const inviteStudent = () => {

  }
  return (
    <div className="mt-4">
      {/* <h2 className="text-xl font-bold mb-2">Students</h2> */}

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
        <NavLink to={'invite'} className="btn btn-success btn-sm" >
          <FiUserPlus className="mr-2" />
          Invite Student
        </NavLink>
      </div>
      {view === "detailed" ? ( <ul className="space-y-2">
        {students.map((student, index) => (
          <article
            key={student.email}
            className="mb-12 flex border shadow-sm border-base-300 items-center  flex-col gap-y-4 sm:flex-row flex-wrap  p-3 "
          >
            {/* IMAGE */}
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
        ))}
      </ul>) : (<>Table View</>) }
    </div>
  );
};

export default StudentList;

//  return (
//     <div className="container mx-auto p-4 border">
//       <div className="flex items-center justify-between border-b border-base-200 mb-6">
//         <h1 className="text-2xl font-bold">Classroom Details</h1>
//         <div className="navbar-center hidden lg:flex ">
//           <ClassroomNavbar />
//         </div>
//       </div>
//       {classroom && (

//       )}
//     </div>
//   );
