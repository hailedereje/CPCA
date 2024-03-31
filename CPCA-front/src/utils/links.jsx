import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BsFiles } from "react-icons/bs";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { RiLogoutBoxFill } from "react-icons/ri";

export const InstructLinks = [
  { id: 1, text: "stats", path: "/dashboard", icon: <IoBarChartSharp /> },
  { id: 2, text: "All courses", path: "all-course", icon: <MdQueryStats /> },
  { id: 3, text: "Add-course", path: "add-course", icon: <FaWpforms /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
];

export const StudentLinks = [
  { id: 1, text: "My Courses", path: "/", icon: <IoBarChartSharp /> },
  { id: 2, text: "all Courses", path: "all-courses", icon: <MdQueryStats /> },
  { id: 3, text: "Enroll", path: "add-course", icon: <FaWpforms /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 5, text: "Files", path: "Files", icon: <BsFiles /> },
  
];

export const AdminLinks = [
  { id: 1, text: "status", path: "/dashboard", icon: <IoBarChartSharp /> },
  { id: 2, text: "profile", path: "profile", icon: <ImProfile /> },
  {
    id: 3,
    text: "All Instructors",
    path: "all-instructors",
    icon: <LiaChalkboardTeacherSolid />,
  },
  {
    id: 4,
    text: "Add Instructor",
    path: "add-instructor",
    icon: <BsPersonFillAdd />,
  },
  { id: 5, text: "All Students", path: "all-students", icon: <FaUsers /> },
];
