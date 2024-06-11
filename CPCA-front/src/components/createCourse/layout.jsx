import { useSelector } from "react-redux"
import RichTextExample from "../textEditor/textEditor"
import { MdMenu } from "react-icons/md"
import { useState } from "react"
import { EditCourseError } from "./error/editCourseError"
import { EditCourseSidebar } from "./editCourseSidebar"
import { Outlet, useParams } from "react-router-dom"
import { FaChevronRight } from "react-icons/fa"
import { useQuery } from "@tanstack/react-query"
import { Loading } from "./components/loader"
import newRequests from "@/utils/newRequest"
import { Drawer } from "./components/courseDrawer"
import { useCourse } from "./hooks/course-hooks"

export const CourseLayout = () => {
    const param = useParams()
    
    const { data,isLoading,isError,error } = useCourse(param.id)

    const { activeLesson,course } = useSelector(x => x.createCourseState)
    const { name } = course;
    const [ show,setShow ] = useState(true)

    if(isError) {
      return JSON.stringify(error.message)
    }
    return (
        <div className="w-full h-full max-w-[2048px]">
           {isLoading ? <Loading/>: <>
                <div className="flex w-full h-full">
                    <Drawer data={data.data.course}/>
                    <div className="flex items-start justify-center w-full h-full">
                        <Outlet/>
                    </div>
                </div>
            </> }
        </div>
    )
}


