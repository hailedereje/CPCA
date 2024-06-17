import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { format } from 'date-fns';
import { FaUsers, FaBook, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';
import { FiRefreshCw } from 'react-icons/fi';

function Stats() {
  const context = useOutletContext();

  if (!context) {
    return <div className="text-center text-gray-500 dark:text-gray-400">No classroom data available.</div>;
  }

  const { classroom, refetch, isFetching } = context;
  const { name, description, createdAt, students } = classroom;

  useEffect(() => {
    if (!classroom && !isFetching) {
      refetch();
    }
  }, [classroom, isFetching, refetch]);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:bg-gray-900 rounded-lg shadow-xl">
      {isFetching ? (
        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
          <BiLoaderCircle className="animate-spin h-6 w-6 mr-2" />
          Fetching data...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard icon={FaInfoCircle} color="blue" title="Classroom Name" value={name} />
          <StatCard icon={FaBook} color="green" title="Course Name" value={name} />
          <StatCard icon={FaInfoCircle} color="yellow" title="Description" value={description} />
          <StatCard icon={FaCalendarAlt} color="red" title="Created At" value={format(new Date(createdAt), 'PPP')} />
          <StatCard icon={FaUsers} color="purple" title="Number of Students" value={students.length} />
        </div>
      )}
      <button
        onClick={refetch}
        className="mt-6 w-full flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        <FiRefreshCw className="mr-2" />
        Refresh Data
      </button>
    </div>
  );
}

function StatCard({ icon: Icon, color, title, value }) {
  return (
    <div className="p-6 bg-white text-black  border-l-4 border-blue-500 rounded-lg shadow-lg transform hover:scale-104 transition-transform duration-300">
      <div className="flex items-center mb-2">
        <Icon className={`text-black-500 h-6 w-6 mr-2`} />
        <h3 className="text-lg font-semibold text-gray-800 ">{title}</h3>
      </div>
      <p className="text-gray-700 ">{value}</p>
    </div>
  );
}

export default Stats;
