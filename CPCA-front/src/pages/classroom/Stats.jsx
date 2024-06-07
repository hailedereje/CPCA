import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { format } from "date-fns";

function Stats() {
  const {classroom } =  useOutletContext(); 

  const { _id: id, name, description, createdAt, students } = classroom;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold">classroomId: </h3>
          <p>{id}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold">Name</h3>
          <p>{name}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold">Description</h3>
          <p>{description}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold">Created At</h3>
          <p>{format(new Date(createdAt), 'PPP')}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold">Number of Students</h3>
          <p>{students.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Stats