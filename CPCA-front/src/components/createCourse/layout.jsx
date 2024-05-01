import { useSelector } from "react-redux"
import RichTextExample from "../textEditor/textEditor"
import { CreateCourseSideBar } from "./createCourseSidebar"
import { TextEditor } from "../textEditor/fraolaEditor"

export const Layout = () => {
    const course = useSelector(x => x.createCourseState.chapters)
    console.log(course[0].lessons[0])
    return (
        <div className="flex w-full">
            <div className="w-1/5 relative min-w-[300px] max-w-[350px]">
                <CreateCourseSideBar/>
            </div>
            <div className="flex flex-col w-4/5 border p-5">
                <RichTextExample topic={course[0].lessons}/>
                {/* <TextEditor topicItem={{show:true}}/> */}
            </div>
        </div>
    )
}