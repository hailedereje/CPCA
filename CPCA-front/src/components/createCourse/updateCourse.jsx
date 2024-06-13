import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { MdCheckCircle, MdDelete, MdError, MdModeEditOutline, MdPublish } from "react-icons/md";
import { Tags } from "./components/addTags";
import { AddDescription } from "./components/addDescription";
import { Loading } from "./components/loader";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UploadImage } from "../textEditor/uploadImage";
import { FaBook, FaChevronLeft, FaChevronRight, FaEdit } from "react-icons/fa";
import { useCourse, useDeleteLab, usePublishCourse } from "./hooks/course-hooks";
import { GiTestTubes } from "react-icons/gi";
import { IconWrapper } from "./components/icon-wrapper";
import { AiOutlinePlus } from "react-icons/ai";
import { MenuWrapper } from "./components/courseDrawer";
import { CiViewTimeline } from "react-icons/ci";
import { UpdatebasicInFormation } from "./createCourse";
import { openConfirmationDialog } from "@/features/course/coursSidebarSlice";
import { ActionTypes } from "./action.Types";
import { Confirmation } from "./components/confirmationDialog";
import { EditCourseError, QuizError } from "./error/editCourseError";



export const UpdataCourse = () => {
  const param = useParams()
  const dispatch = useDispatch()

  const { data, isLoading, isSuccess, isError, error } = useCourse(param.id)
  const courseRequirement = { numOfChapters: 0, numOfMinLessons: 0, numOfQuizes: 0 }
  const state = { isPublished: false, isValid: false }
  if(isSuccess) {
    handleCourseData(data, state)
  }
  

  if (isError && error.response.status == 404) {
    return (
      <div className="flex items-center justify-center fixed inset-0 w-full h-full">
        <QuizError message={error.response.data.error} status={error.response.status} />
      </div>
    )
  }
  return (
    <div className="flex w-full h-full flex-col gap-4">
      <Confirmation />
      {isLoading ?
        <Loading />
        :
        <div className="w-full h-screen  flex  gap-6 p-2 lg:pl-[30%] ">
          <div className="flex flex-col max-w-xs w-1/3 h-full xxs:hidden lg:block fixed top-12 left-0 ">
            <CourseComponent course={data.data.course} />
          </div>
          <div className="xxs:block lg:hidden">
            <SidebarDrawer>
              <CourseComponent course={data.data.course} />
            </SidebarDrawer>
          </div>
          <div className="w-full h-full flex flex-col gap-2">
            <UpdateCourseBanner courseId={param.id} state={state} />
            <div className="flex gap-4 flex-col md:flex-row">
              <UpdatebasicInFormation courseId={param.id} initialData={data.data.course} />
            </div>

            <div className="flex gap-4 flex-col md:flex-row">
              <UploadImage id={param.id} img={data.data.course?.templateImg} />
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

const UpdateCourseBanner = ({ courseId, state }) => {
  const dispatch = useDispatch()
  const { mutateAsync: publish, isPending} = usePublishCourse(courseId)
  const onPublish = async () => {
    await publish(courseId)
  }
  return (
    <div className="flex justify-between items-center gap-4 px-6 py-3 bg-white  rounded-md border  transition duration-300">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold capitalize text-gray-800 ">Course Details</h1>
        {state.isPublished ? (
          <MdCheckCircle size={24} className="text-green-500" title="Published" />
        ) : (
          <MdError size={24} className="text-yellow-500" title="Unpublished" />
        )}
      </div>
      <MenuWrapper>
        <button 
          onClick={onPublish}
          disabled = {state.isPublished || !state.isValid}
          className={`px-4 py-2 w-full flex items-center hover:bg-gray-100   ${!state.isPublished && state.isValid ? 'cursor-pointer':'cursor-not-allowed disabled'}`}>
          <span className="mr-2"><MdPublish /></span>
          <span className='text-sm capitalize'>Publish course</span>
          {isPending && <Loading />}
        </button>
        <button 
          onClick={() => dispatch(openConfirmationDialog({ courseId, actionType: ActionTypes.DELETE_COURSE, message: "are you sure u want to delete the course" }))} 
          className="px-4 py-2 flex w-full items-center  hover:bg-gray-100">
          <span className="mr-2"><MdDelete size={15} className="text-red-400" /></span>
          <span className='text-sm capitalize'>Delete course</span>
        </button>
        
      </MenuWrapper>
    </div>
  );
}

export const CourseLabs = ({ data }) => {
  const navigate = useNavigate()
  return (
    <div className=" p-4 rounded-md max-w-4xl flex flex-col gap-4 border">
      <span className="flex flex-col gap-4">
        <span className="flex justify-between items-center gap-4">
          <span className="text-xl capitalize font-medium flex gap-4 items-center">
            <IconWrapper bg="bg-blue-500" color="text-white" icon={<GiTestTubes />} />
            <span >Labs</span>
          </span>
          <button onClick={() => navigate('lab')} className="flex items-center justify-center bg-blue-500 p-2 rounded-md text-white">
            <AiOutlinePlus className="h-6 w-6 mr-2" />
            <span className="xxs:text-sm md:text-md">Add Lab</span>
          </button>
        </span>

        <span className="text-xs lowercase xxs:line-clamp-1 md:line-clamp-2 text-gray-500">
          add labs to the course that students can perform to test their understanding of the course content make it interactive and fun
          as students can learn by doing and not just reading or watching videos 
        </span>
      </span>
      <div className="grid md:grid-cols-2 xxs:grid-cols-1 gap-2 h-[200px] overflow-auto editor p-2">
        {data?.map((lab) => (
          <Lab lab={lab} />
        ))}
      </div>
    </div>
  )
}

const Lab = ({ lab }) => {
  const param = useParams()
  const navigate = useNavigate()
  const { mutateAsync: deleteLab } = useDeleteLab(param.id, lab._id)
  const handleDelete = async () => {
    await deleteLab({ courseId: param.id, labId: lab._id })
  }
  return (
    <div className="flex flex-col gap-2 max-h-20 p-2 border rounded-md  relative">
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
      <span className="text-xs text-gray-700  md:line-clamp-2 line-clamp-1">{lab.description}</span>
    </div>
  )
}


const CourseComponent = ({ course }) => {
  return (
    <div className="max-w-4xl max-h-screen overflow-auto w-full h-full  rounded-lg shadow-lg pt-4">
      <div className="w-full p-4 flex justify-between items-center bg-blue-400 rounded-t-lg">
        <div className="flex items-center gap-2">
          <FaBook className="text-white text-xl" />
          <h1 className="text-lg font-semibold capitalize text-white">{course.title}</h1>
        </div>
        <Link to={"chapters"}>
          <FaEdit className="text-white text-xl hover:text-blue-200 transition-colors" />
        </Link>
      </div>

      {course.chapters.map((chapter) => (
        <div key={chapter._id} className="border-b last:border-b-0">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer text-md capitalize font-medium p-3 hover:bg-blue-100 transition-colors">
              <span>{chapter.title} ({chapter.lessons.length})</span>
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
            <div className="px-6 pt-4 pb-2 text-gray-700">
              <ul className="list-disc list-inside flex flex-col gap-1">
                {chapter.lessons.map((lesson) => (
                  <li key={lesson._id} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2"
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
                    <span className="text-md capitalize">{lesson.title}</span>
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

export default CourseComponent;


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
      <div className={`fixed  h-full top-0 left-0 w-1/2 z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out shadow-lg`} >
        {children}
        <button onClick={toggleDrawer} className="absolute top-1/2 -right-10 rounded p-2 bg-gray-500/10 h-20">
          {isOpen ? <FaChevronLeft className="text-white"/> : <FaChevronRight className="text-white"/>}
        </button>
      </div>
    </div>
  );
}


const handleCourseData = (data, state) => {
  if (!data || !data.data) return;

  const { course } = data.data;

  if (course.isPublished) {
    state.isPublished = true;
  } else {
    const { chapters } = course;
    const numOfChapters = chapters.length;
    let numOfMinLessons = 0;

    for (let chapter of chapters) {
      numOfMinLessons += chapter.lessons.length;
    }

    if (numOfChapters >= 2 && numOfMinLessons >= 2) {
      state.isValid = true;
    }
  }
};