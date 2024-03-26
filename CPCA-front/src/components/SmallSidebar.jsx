import React from 'react';

const SmallSidebar = () => {
 return (
    <div className="bg-gray-800 text-white w-full md:hidden">
      <div className="p-4">
        <a href="#" className="block py-2 px-4">Home</a>
        <a href="#" className="block py-2 px-4">About</a>
        <a href="#" className="block py-2 px-4">Contact</a>
      </div>
    </div>
 );
};

export default SmallSidebar;