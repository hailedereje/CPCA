import React from "react";

function ProfileInputElt({
  label,
  name,
  type,
  value,
  placeholder,
  icon,
  onChange, 
  readOnly = false// Add onChange handler
}) {
  return (
    <div className="mb-5">
      <label className="mb-3 block text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <div className="flex gap-2 items-center relative">
        <div className="absolute left-3">{icon}</div>
        <input
          className="ps-8 mt-1 p-2 w-full h-full text-sm border border-gray-300 rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none dark "
          type={type}
          name={name}
          id={name}
          value={value} // Use value instead of defaultValue
          onChange={onChange}
          readOnly = {readOnly} // Handle onChange event
        />
      </div>
    </div>
  );
}

export default ProfileInputElt;
