import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { format } from "date-fns";

function Stats() {
  const context = useOutletContext();

  if (!context) {
    return <div className="text-center text-gray-500 dark:text-gray-400">No classroom data available.</div>;
  }

  const { classroom, refetch, isFetching } = context; 
  const { _id: id, name, description, createdAt, students } = classroom;

  useEffect(() => {
    // Call refetch only if classroom data is not available to prevent infinite loops
    if (!classroom && !isFetching) {
      refetch();
    }
  }, [classroom, isFetching, refetch]);

  return (
    <div className="p-4 bg-white  rounded-lg shadow-md">
      {isFetching ? (
        <div className="text-center  dark:text-gray-400">Fetching data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100  rounded-lg">
            <h3 className="text-lg font-semibold">Classroom ID:</h3>
            <p>{id}</p>
          </div>
          <div className="p-4 bg-gray-100  rounded-lg">
            <h3 className="text-lg font-semibold">Name</h3>
            <p>{name}</p>
          </div>
          <div className="p-4 bg-gray-100  rounded-lg">
            <h3 className="text-lg font-semibold">Description</h3>
            <p>{description}</p>
          </div>
          <div className="p-4 bg-gray-100  rounded-lg">
            <h3 className="text-lg font-semibold">Created At</h3>
            <p>{format(new Date(createdAt), 'PPP')}</p>
          </div>
          <div className="p-4 bg-gray-100  rounded-lg">
            <h3 className="text-lg font-semibold">Number of Students</h3>
            <p>{students.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stats;
