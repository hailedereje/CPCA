import React from "react";
import { FiUser } from "react-icons/fi";

const StudentList = ({ students }) => {
  return (
    <div className="mt-4">
      {/* <h2 className="text-xl font-bold mb-2">Students</h2> */}
      <ul className="space-y-2">
        {students.map((student, index) => (
          <article
            key={student.email}
            className="mb-12 flex border border-base-300 items-center  flex-col gap-y-4 sm:flex-row flex-wrap  p-3 "
          >
            {/* IMAGE */}
            <img
              src={
                "https://res.cloudinary.com/ddc2e1mzy/image/upload/v1715759120/ProfileImgs/pp_xznryz.jpg"
              }
              alt={student.username}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
            />
            <div className="sm:ml-16 sm:w-48">
              <h3 className="capitalize font-medium">{student.username}</h3>
              <h4 className="mt-2 capitalize text-sm text-neutral-content">
                {student.email}
              </h4>
            </div>
          </article>
        ))}
      </ul>
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
