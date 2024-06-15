import { Outlet, useParams } from "react-router-dom"
import { Loading } from "./components/loader"
import { Drawer } from "./components/courseDrawer"
import { useCourse } from "./hooks/course-hooks"

export const CourseLayout = () => {
    const param = useParams()
    const { data,isLoading,isError,error } = useCourse(param.id)

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


