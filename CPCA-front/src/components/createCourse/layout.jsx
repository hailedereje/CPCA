import { useSelector } from "react-redux"
import RichTextExample from "../textEditor/textEditor"
import { MdMenu } from "react-icons/md"
import { useState } from "react"
import { EditCourseError } from "./error/editCourseError"
import { EditCourseSidebar } from "./editCourseSidebar"
import { Outlet } from "react-router-dom"

export const CourseLayout = () => {
    const { activeLesson, course } = useSelector(x => x.createCourseState)
    const { name } = course;
    const [ show,setShow ] = useState(true)
    return (
        <div className="flex flex-col w-full max-w-[2048px]">
            <>
                <div className="flex items-center gap-6 fixed z-10 left-0 top-0 h-16 w-full max-w-[2048px] p-4 bg-[#1c2839] text-white">
                    <button onClick={() => setShow(prev => !prev)}>
                        <MdMenu size={30} />
                    </button>
                    <span className="text-xl capitalize">{name}</span>
                </div>
                <div className="flex">
                    <div className={`${show ? "":"hidden"}`}>
                    <EditCourseSidebar course={course} activeLesson={ activeLesson } /> 
                    </div>
                    
                    <div className={`${show ? "ml-[28%]":""} w-full pt-16`}>
                        <Outlet/>
                        {/* <RichTextExample/> */}
                    </div>
                </div>
            </> 
        </div>
    )
}