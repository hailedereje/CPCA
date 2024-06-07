import { Link, useNavigate, useParams } from "react-router-dom";
import { defaultFroalaConfig } from "@/constants";
import { useDispatch } from "react-redux";
import FroalaEditor from "react-froala-wysiwyg";
import { useState } from "react";
import { MdModeEditOutline, MdOutlineDescription } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequests from "@/utils/newRequest";
import { Tags } from "./components/addTags";
import { Prerequisites } from "./components/addPrerequisites";
import { courseRoutes } from "@/routes";
import { AddDescription } from "./components/addDescription";
import { AddObjective } from "./components/addObjective";
import { Loading } from "./components/loader";
import { RiAddLine, RiDeleteBin6Line } from "react-icons/ri";
import { CourseName } from "./components/courseName";
import { UploadImage } from "../textEditor/uploadImage";
import { FaBook, FaChevronLeft, FaChevronRight, FaEdit } from "react-icons/fa";
import { Breadcrumb } from "./components/bread-crumb";
import { useCourse, useDeleteLab } from "./hooks/course-hooks";
import { GiTestTubes } from "react-icons/gi";
import { IconWrapper } from "./components/icon-wrapper";
import { AiOutlinePlus } from "react-icons/ai";
import { MenuWrapper } from "./components/courseDrawer";
import { CiViewTimeline } from "react-icons/ci";



export const UpdataCourse = () => {
  const param = useParams()

  const { data, isLoading } = useCourse(param.id)

  return (
    <div className="flex w-full h-full flex-col gap-4">
      {isLoading ?
        <Loading />
        :
        <div className="w-full h-screen overflow-auto editor flex dark:text-white gap-6 p-2 lg:pl-[30%]">
          <div className="flex flex-col max-w-xs w-1/3 h-full dark:bg-gray-600 xxs:hidden lg:block fixed top-12 left-0 z-20">
            <CourseComponent course={data.data.course} />
          </div>
          <div className="xxs:block lg:hidden">
            <SidebarDrawer>
              <CourseComponent course={data.data.course} />
            </SidebarDrawer>
          </div>

          <div className="w-full h-full flex flex-col gap-2 ">
            <div className="flex gap-4 flex-col md:flex-row">
              <UploadImage id={param.id} img={data.data.course.templateImg} />
              <Tags courseId={param.id} />
            </div>
            <div className="max-w-4xl">
              <AddDescription courseId={param.id} />
            </div>
            <CourseLabs data={data.data.course.labs} />
          </div>
        </div>
      }
    </div>

  )
}

export const CourseLabs = ({ data }) => {
  const navigate = useNavigate()
  return (
    <div className="dark:bg-gray-600 p-4 rounded-md max-w-4xl flex flex-col gap-4">
      <span className="flex flex-col gap-4">
        <span className="flex justify-between items-center gap-4">
          <span className="text-xl capitalize font-medium flex gap-4 items-center">
            <IconWrapper bg="bg-blue-500" color="text-white" icon={<GiTestTubes />} />
            <span >Labs</span>
          </span>
          <button onClick={() => navigate('lab')} className="flex items-center justify-center bg-blue-500 p-2 rounded-md">
            <AiOutlinePlus className="h-6 w-6 mr-2" />
            <span className="xxs:text-sm md:text-md">Add Lab</span>
          </button>
        </span>
        
        <span className="text-xs lowercase xxs:line-clamp-1 md:line-clamp-2 text-gray-500 dark:text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatem perspiciatis consequatur qui numquam veniam similique rem ut esse architecto.</span>
      </span>
      <div className="grid md:grid-cols-2 xxs:grid-cols-1 gap-2 h-[200px] overflow-auto editor border p-2 rounded-md border-gray-400">
        {data?.map((lab) => (
            <Lab lab={lab} />     
        ))}
        </div>
    </div>
  )
}

const Lab = ({lab}) => {
  const param = useParams()
  const navigate = useNavigate()
  const { mutateAsync: deleteLab } = useDeleteLab(param.id,lab._id)
  const handleDelete = async () => {
    await deleteLab({courseId:param.id,labId:lab._id})
  }
  return (
    <div className="flex flex-col gap-2 max-h-20 p-2 border dark:bg-gray-800 rounded-md dark:border-gray-700 relative">
            <div className="flex justify-between items-start gap-x-4 relative">
              <span className="text-sm capitalize font-medium line-clamp-1">{lab.title}</span>
              <MenuWrapper >
                  <li onClick={() => navigate(`lab/${lab._id}/view`)} className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500">
                      <span className="mr-2"><CiViewTimeline /></span>
                      <span className='text-sm capitalize'>view</span>
                  </li>
                  <li onClick={() => navigate(`lab/${lab._id}`)} className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500">
                      <span className="mr-2"><MdModeEditOutline /></span>
                      <span className='text-sm capitalize'>update</span>
                  </li>
                  <li className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500" onClick={handleDelete}>
                      <span className="mr-2"><RiDeleteBin6Line className="text-red-400" /></span>
                      <span className='text-sm capitalize'>delete</span>
                  </li>
            </MenuWrapper>
            </div>
            
            <span className="text-xs text-gray-400 dark:text-white md:line-clamp-2 line-clamp-1">{lab.description}</span>
          </div>
  )
}


const CourseComponent = ({ course }) => {
  return (
    <div className="max-w-4xl max-h-screen overflow-auto editor w-full">
      <div className="w-full p-2 flex justify-between items-center gap-2 bg-blue-500">
        <div className="flex gap-2 items-center">
          <span><FaBook /></span>
          <h1 className="text-xl capitalize text-center">{course.title}</h1>
        </div>

        <Link to={"chapters"}>
          <FaEdit />
        </Link >
      </div>

      {course.chapters.map((chapter) => (
        <div key={chapter._id} className="">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer text-md capitalize font-normal text-blue-900 bg-blue-100 p-2 hover:bg-blue-200 ">
              <span>{chapter.title + '(' + chapter.lessons.length + ')'}</span>
              <svg
                className="w-5 h-5 text-blue-500 transform transition-transform duration-200 group-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pt-4 pb-2 text-sm text-gray-600">
              <ul className="list-disc list-inside flex flex-col gap-1">
                {chapter.lessons.map((lesson) => (
                  <li key={lesson._id} className="w-full flex items-center shadow-sm dark:hover:bg-gray-500 p-1">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 20l9-5-9-5-9 5 9 5zM12 12l9-5-9-5-9 5 9 5z"
                      />
                    </svg>
                    <span className="dark:text-white text-sm capitalize">{lesson.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
};

export const SidebarDrawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="">
      <div
        className={`fixed inset-0 z-10 ${isOpen ? "" : "hidden"}`}
        onClick={toggleDrawer}
      ></div>
      <div className={` fixed  h-full top-0 left-0 bg-white dark:bg-gray-600 dark:text-white w-80 z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out shadow-lg`} >
        {children}
        <button onClick={toggleDrawer} className="absolute top-1/2 -right-10 rounded p-2 bg-gray-500/10 h-32">
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
    </div>
  );
}
