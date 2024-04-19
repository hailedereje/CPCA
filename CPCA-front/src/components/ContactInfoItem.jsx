import React from "react";
import { MdPlace } from "react-icons/md";

const ContactInfoItem = ({ icon = <MdPlace />, text = "I need text" }) => {
  return (
    <div className="p-5 flex items-center gap-8 rounded-md sm:p-8 sm:gap-10 md:p-10 md:gap-12">
      <div className="p-4 sm:p-5 rounded-full">
        {React.cloneElement(icon, {
          className: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8",
        })}
      </div>
      <p className="font-mono text-sm sm:text-base md:text-lg">{text}</p>
    </div>
  );
};

export default ContactInfoItem;
