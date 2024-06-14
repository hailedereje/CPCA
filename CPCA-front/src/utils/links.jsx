import { IoBarChartSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { RiDraftLine, RiSoundModuleLine } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";

export const InstructLinks = [
  // { id: 1, text: "Activities", path: "/dashboard", icon: <IoBarChartSharp /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
  {id: 5, text: "classrooms", path: "classrooms", icon: <FaChalkboardTeacher/>
}
];

export const StudentLinks = [
  { id: 1, text: "status", path: "/dashboard", icon: <IoBarChartSharp /> },
  { id: 2, text: "profile", path: "profile", icon: <ImProfile /> },
  {id: 3, text: "courses", path: "courses", icon: <FaChalkboardTeacher/>},
  {id: 4, text: "classrooms", path: "classrooms", icon: <FaChalkboardTeacher/>}
];

export const AdminLinks = [
  { id: 1, text: "status", path: "/dashboard", icon: <IoBarChartSharp /> },
  { id: 2, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 3, text: "users", path: "users", icon: <FaUsers /> },
  // { id: 4, text: "create course",path: "course/create",icon: <RiSoundModuleLine />},
  { id: 5, text: "courses", path: "course",icon: <RiDraftLine/>}
];



export const instructorActivities = [
  {
    id: "1",
    text: "create classroom",
    activity: "Go",
    icon: <FaChalkboardTeacher size={50} />,
    path: 'classroom'
    
  },
  {
    id: "3",
    text: "manage students",
    activity: "Go",
    icon: <BsFillPeopleFill size={50} />,
    path: ''

  },
  {
    id: "4",
    text: "manage instructors",
    activity: "Go",
    icon: <GiTeacher size={50} />,
    path: ''

  },
];