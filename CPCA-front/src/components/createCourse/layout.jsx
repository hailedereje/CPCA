import { useSelector } from "react-redux"
import RichTextExample from "../textEditor/textEditor"
import { MdMenu } from "react-icons/md"
import { useState } from "react"
import { EditCourseError } from "./error/editCourseError"
import { EditCourseSidebar } from "./editCourseSidebar"

export const Layout = () => {
    const { activeLesson, course,isCourse } = useSelector(x => x.createCourseState)
    const { name } = course;
    const [ show,setShow ] = useState(true)
    const noContent = Object.keys(activeLesson.lesson).length === 0
    return (
        <div className="flex flex-col w-full max-w-[2048px]">
           {isCourse ? <>
                <div className="flex items-center gap-6 fixed z-10 left-0 top-0 h-16 w-full max-w-[2048px] p-4 bg-[#1c2839] text-white">
                    <button onClick={() => setShow(prev => !prev)}>
                        <MdMenu size={30} />
                    </button>
                    <span className="text-xl capitalize">{name}</span>
                </div>
                <div className="flex">
                    <div className={`${show ? "":"hidden"}`}>
                    <EditCourseSidebar course={course} activeLesson={ activeLesson }/> 
                    </div>
                    
                    <div className={`${show ? "ml-[28%]":""} w-full pt-16`}>
                        {!noContent &&<RichTextExample {...activeLesson}/>}
                        {noContent && 
                        <div className="flex flex-col items-center justify-center h-full p-4">
                        <p className="text-3xl font-bold text-gray-600 mb-2 uppercase">Instruction</p>
                        <p className="text-lg text-gray-400">Add Lessons after creating a chapter. Click on a lesson to view and edit its content.</p>
                    </div>}
                        </div>
                </div>
            </> : <EditCourseError/>}
        </div>
    )
}