// User Detail Page
import { useState } from 'react'
import { BiSearch } from 'react-icons/bi';

// eslint-disable-next-line react/prop-types
const UserDetails = ({users}) => {
  // States
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  // function to handle click on buttons 
  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  
  const handleDelete = (id) => {
    console.log('Deleting user with id:', id);
    alert('are you sure you want to delete this user?');

  }
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleUsersPerPageChange = (e) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // function to filter user based on username, email and phone number
  // eslint-disable-next-line react/prop-types
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex gap-4 items-center">
        <div className="relative">
          <input
            className="p-3 w-48 lg:w-96 text-lg text-gray-900 border border-gray-300 rounded-full pl-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Search Username, Email, Phone"
            onChange={handleSearch}
          />
          <BiSearch className="absolute left-4 top-4 text-2xl text-gray-500" />
        </div>
        <label htmlFor="usersPerPage" className="text-lg">
          Users Per Page:
        </label>
        <select
          id="usersPerPage"
          className="text-lg"
          value={usersPerPage}
          onChange={handleUsersPerPageChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
      {/* table  */}
      <div className="w-full mt-4 overflow-x-auto">
  <table className="w-full bg-white border border-gray-200 divide-y divide-gray-200">
    <thead className="bg-gray-100">
      <tr>
        <th className="pt-2 pb-3">NO.</th> 
        <th className="pt-2 pb-3">Username</th>
        <th className="pt-2 pb-3">Email</th>
        <th className="pt-2 pb-3">Creation Date</th>
        <th className="pt-2 pb-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {currentUsers.map((user, index) => (
        <tr
          className={`${
            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
          } hover:bg-gray-100`}
          key={index}
        >
          <td className="pt-2 pb-2 pl-16">{index + 1}</td>
          <td className="pt-2 pb-2 pl-16">{user.username}</td>
          <td className="pt-2 pb-2 pl-16">{user.email}</td>
          <td className="pt-2 pb-2 pl-16">{user.creationDate}</td>
          <td className="pt-2 pb-2 pl-16 flex gap-2">
            <button
              className="block rounded-lg bg-gradient-to-tr from-blue-800 to-blue-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={() => handleRowClick(user)}
            >
              Details
            </button>
            <button
              className="block rounded-lg bg-gradient-to-tr from-red-800 to-red-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={() => handleDelete(user._id)} 
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      <div className="pagination flex flex-row mt-5">
        <button
          className="block rounded-lg bg-gradient-to-tr from-gray-800 to-gray-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-lg mx-2">Page {currentPage}</span>
        <button
          className="block rounded-lg bg-gradient-to-tr from-gray-800 to-gray-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={indexOfLastUser >= filteredUsers.length}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* modal on click */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
          <div className="modal-overlay fixed inset-0 bg-black opacity-80 "></div>
          <div className="modal-content relative bg-white w-96 pl-6 pb-6 pr-8 rounded-lg shadow-lg">
            <span
              className="close cursor-pointer relative text-3xl top-[1px] left-full text-red-500"
              onClick={handleCloseModal}
            >
              &times;
            </span>
            <h3 className="text-xl relative inset-0 text-black font-bold mb-4">
              User Details
            </h3>
            {selectedUser && (
              <div className="relative">
                <p className="mb-2">
                  <span className="font-bold">Username:</span>{' '}
                  {selectedUser.username}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Email:</span> {selectedUser.email}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Phone:</span> {selectedUser.phone}
                </p>
                <button
                  className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleCloseModal}
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
