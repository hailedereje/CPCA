import { useEffect } from 'react';
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
    if (!isFetching) {
      refetch();
    }
  }, [refetch]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {isFetching ? (
        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
          <BiLoaderCircle className="animate-spin h-6 w-6 mr-2" />
          Fetching data...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <FaInfoCircle className="text-blue-500 h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">Classroom Name:</h3>
            </div>
            <p>{name}</p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <FaBook className="text-green-500 h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">Course Name</h3>
            </div>
            <p>{name}</p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <FaInfoCircle className="text-yellow-500 h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">Description</h3>
            </div>
            <p>{description}</p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <FaCalendarAlt className="text-red-500 h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">Created At</h3>
            </div>
            <p>{format(new Date(createdAt), 'PPP')}</p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <FaUsers className="text-purple-500 h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">Number of Students</h3>
            </div>
            <p>{students.length}</p>
          </div>
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

export default Stats;
