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
      <div className="flex items-center bg-base-200">
        <div className="ml-2">{icon}</div>
        <input
          className="w-full rounded py-3 px-4 bg-base-200 focus:border-0"
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
