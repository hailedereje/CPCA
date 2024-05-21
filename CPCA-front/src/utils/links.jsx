import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BsFiles } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { RiDraftLine, RiSoundModuleLine } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";

export const InstructLinks = [
  { id: 1, text: "Activities", path: "/dashboard", icon: <IoBarChartSharp /> },
  { id: 2, text: "All courses", path: "courses", icon: <MdQueryStats /> },
  { id: 3, text: "Add-course", path: "add-course", icon: <FaWpforms /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
];

export const StudentLinks = [
  { id: 1, text: "Status", path: "/dashboard", icon: <IoBarChartSharp /> },
  { id: 2, text: "all Courses", path: "courses", icon: <MdQueryStats /> },
  { id: 3, text: "Enroll", path: "add-course", icon: <FaWpforms /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 5, text: "Files", path: "Files", icon: <BsFiles /> },
];

export const AdminLinks = [
  { id: 1, text: "status", path: "/dashboard", icon: <IoBarChartSharp /> },
  { id: 2, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 3, text: "Users", path: "users", icon: <FaUsers /> },
  { id: 4, text: "Create course",path: "course",icon: <RiSoundModuleLine />},
  { id: 5, text: "Draft courses", path: "courses/draft",icon: <RiDraftLine/>}
];



export const instructorActivities = [
  // {
  //   id: "1",
  //   text: "Add Course",
  //   activity: "Add",
  //   icon: <IoMdAddCircleOutline size={50} />,
  // },
  // {
  //   id: "2",
  //   text: "Add Lesson",
  //   activity: "Add",
  //   icon: <BiBookAdd size={50} />,
  // },
  {
    id: "1",
    text: "Manage Courses",
    activity: "Go",
    icon: <FaChalkboardTeacher size={50} />,
    path: '/course/edit/1'
    
  },
  {
    id: "2",
    text: "Add Files",
    activity: "Add",
    icon: <AiOutlineFileAdd size={50} />,
    path: ''

  },
  {
    id: "3",
    text: "Manage Students",
    activity: "Go",
    icon: <BsFillPeopleFill size={50} />,
    path: ''

  },
  {
    id: "4",
    text: "Manage Instructors",
    activity: "Go",
    icon: <GiTeacher size={50} />,
    path: ''

  },
];