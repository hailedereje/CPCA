// Greeting.js
import React from 'react';
import { useSelector } from "react-redux";

function Greeting() {
  const user = useSelector((store) => store.userState.user) || 'Alemu';

  return (
    <div className="flex items-center mb-8 w-1/2  bg-base-200 p-10">
      <div>
        <h2 className="text-2xl font-semibold">Welcome, {user.username  || 'Alemu'} 🎉!</h2>
        <p className="text-gray-600">We're glad to have you here.</p>
      </div>
    </div>
  );
}

export default Greeting;
