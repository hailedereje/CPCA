import React from "react";

function ProfileInputElt({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  icon,
}) {
  return (
    <div className="mb-5">
      <label className="mb-3 block text-sm font-medium " htmlFor={name}>
        {label}
      </label>
      <div className="flex items-center  bg-base-200 ">
        <div className="ml-2">{icon}</div>
        <input
          className="w-full rounded  py-3 px-4  bg-base-200 focus:border-0  "
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}

export default ProfileInputElt;
