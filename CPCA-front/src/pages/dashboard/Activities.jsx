import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiBookAdd } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { ActivityCard } from "../../components/";

export const instructorActivities = [
  {
    id: "1",
    text: "Add Course",
    activity: "Add",
    icon: <IoMdAddCircleOutline size={50} />,
  },
  {
    id: "2",
    text: "Add Lesson",
    activity: "Add",
    icon: <BiBookAdd size={50} />,
  },
  {
    id: "3",
    text: "Manage Courses",
    activity: "Go",
    icon: <FaChalkboardTeacher size={50} />,
  },
  {
    id: "4",
    text: "Add Files",
    activity: "Add",
    icon: <AiOutlineFileAdd size={50} />,
  },
  {
    id: "5",
    text: "Manage Students",
    activity: "Go",
    icon: <BsFillPeopleFill size={50} />,
  },
  {
    id: "6",
    text: "Manage Instructors",
    activity: "Go",
    icon: <GiTeacher size={50} />,
  },
];

function Activities() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {instructorActivities.map((activity) => (
        <div key={activity.id}>
          <ActivityCard
            text={activity.text}
            activity={activity.activity}
            icon={activity.icon}
          />
        </div>
      ))}
    </div>
  );
}

export default Activities;
