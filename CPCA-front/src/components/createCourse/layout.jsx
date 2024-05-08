import { useSelector } from "react-redux"
import RichTextExample from "../textEditor/textEditor"
import { CreateCourseSideBar } from "./createCourseSidebar"
import { TextEditor } from "../textEditor/fraolaEditor"
import { MdMenu } from "react-icons/md"
import { useState } from "react"

export const Layout = () => {
    const { activeLesson, course } = useSelector(x => x.createCourseState)
    const { name } = course;
    const [ show,setShow ] = useState(true)
    console.log(course)
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center gap-6 fixed z-10 left-0 top-0 h-16 w-full p-4 bg-[#1c2839] text-white">
                <button onClick={() => setShow(prev => !prev)}>
                    <MdMenu size={30} />
                </button>
                <span className="text-xl capitalize">{name}</span>
            </div>
            <div className="flex">
                <div className={`${show ? "":"hidden"}`}>
                   <CreateCourseSideBar course={course} activeLesson={ activeLesson }/> 
                </div>
                
                <div className={`${show ? "ml-[28%]":""} w-full pt-16`}>
                    <RichTextExample {...activeLesson}/>
                </div>
            </div>
        </div>
    )
}