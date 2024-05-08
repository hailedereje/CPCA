import { useSelector } from "react-redux"
import RichTextExample from "../textEditor/textEditor"
import { CreateCourseSideBar } from "./createCourseSidebar"
import { TextEditor } from "../textEditor/fraolaEditor"

export const Layout = () => {
    const { activeLesson, course } = useSelector(x => x.createCourseState)
    const { name } = course;
    
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center fixed z-10 left-0 top-0 h-16 w-full p-4 bg-[#1c2839] text-white">
                <span>{name}</span>
            </div>
            <div className="flex">
                <CreateCourseSideBar course={course} activeLesson={ activeLesson }/>
                <div className="ml-[28%] w-full pt-16">
                    <RichTextExample {...activeLesson}/>
                </div>
            </div>
        </div>
    )
}