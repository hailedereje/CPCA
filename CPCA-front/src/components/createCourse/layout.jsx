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

export const CourseLayout = () => {
    const param = useParams()
    
    const { data,isLoading } = useQuery({
        queryKey: ['course', param.id],
        queryFn: () => newRequests.get(`/courses/course`, {
          params: {
            id: param.id
          }
        }),
        staleTime: 1000 * 6 * 500,
        retry:3
      })

    const { activeLesson,course } = useSelector(x => x.createCourseState)
    const { name } = course;
    const [ show,setShow ] = useState(true)
    return (
        <div className="flex flex-col w-full max-w-[2048px]">
           {isLoading ? <Loading/>: <>
                <div className="flex">
                    <Drawer data={data.data.course}/>
                    <div className="flex items-start justify-center w-full min-h-screen">
                        <Outlet/>
                    </div>
                </div>
            </> }
        </div>
    )
}


