import { useSelector } from "react-redux"
import RichTextExample from "../textEditor/textEditor"
import { MdMenu } from "react-icons/md"
import { useState } from "react"
import { EditCourseError } from "./error/editCourseError"
import { EditCourseSidebar } from "./editCourseSidebar"
import { Outlet } from "react-router-dom"
import { FaChevronRight } from "react-icons/fa"

export const CourseLayout = () => {
    const { activeLesson, course } = useSelector(x => x.createCourseState)
    const { name } = course;
    const [ show,setShow ] = useState(true)
    return (
        <div className="flex flex-col w-full max-w-[2048px]">
            <>
                <div className="flex items-center gap-6 fixed z-10 left-0 top-0 h-16 w-full max-w-[2048px] p-4 bg-slate-50 border border-gray-200">
                    <button onClick={() => setShow(prev => !prev)}>
                        <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M.5 9h9.75v1.25H.5zm0-3.25h15V7H.5zm0 6.5h15v1.25H.5zm0-9.75h9.75v1.25H.5z" />
                        </svg>
                    </button>
                    <div className="capitalize text-sm flex items-center gap-4">
                        <div className="flex gap-2 items-center">
                            <span className="flex w-6 h-6 items-center justify-center bg-blue-600 rounded-full">
                                <span className="text-white text-xs">1</span>
                            </span>
                            <span className="text-sm font-semibold">{name}</span>
                        </div>
                        <span>
                            <FaChevronRight className="text-gray-400"/>
                        </span>
                         {activeLesson.chapterName && <>
                            <div className="flex gap-2 items-center">
                            <span className="flex w-6 h-6 items-center justify-center bg-blue-600 rounded-full">
                                <span className="text-white text-xs">2</span>
                            </span>
                            <span className="text-sm font-semibold">{activeLesson.chapterName}</span>
                        </div>

                        <span>
                            <FaChevronRight className="text-gray-400"/>
                        </span>
                         </>
                        }
                        <div className="flex gap-2 items-center">
                            {activeLesson.lesson?.name && <span className="flex w-6 h-6 items-center justify-center bg-blue-600 rounded-full">
                                <span className="text-white text-xs">3</span>
                            </span>}
                            <span className="text-sm font-semibold">{activeLesson.lesson?.name}</span>
                        </div>
                        
                    </div>
                </div>
                <div className="flex">
                    <div className={`${show ? "":"hidden"} z-10`}>
                        <EditCourseSidebar course={course} activeLesson={ activeLesson } /> 
                    </div>
                    
                    <div className={`${show ? "xl:ml-[28%]":""} w-full pt-16`}>
                        <Outlet/>
                    </div>
                </div>
            </> 
        </div>
    )
}