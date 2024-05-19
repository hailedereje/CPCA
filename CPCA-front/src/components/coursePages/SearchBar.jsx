import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className='p-4 bg-gray-200'>
        <div className="relative w-full md:w-3/4 lg:w-1/2 mx-auto">
            <input type="text" placeholder="Search courses..." className="w-full p-3 rounded-full text-gray-700 border border-gray-300 focus:outline-none" />
            <FaSearch className="absolute right-4 top-4 text-gray-500" />
        </div>
    </div>
  );
};

export default SearchBar;
