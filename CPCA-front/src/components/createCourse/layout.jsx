import { Outlet, useNavigate, useParams } from "react-router-dom"
import { Loading } from "./components/loader"
import { Drawer } from "./components/courseDrawer"
import { useCourse } from "./hooks/course-hooks"
import { AiFillBackward } from "react-icons/ai"

export const CourseLayout = () => {
    const param = useParams()
    const navigate = useNavigate()
    const { data,isLoading,isError,error } = useCourse(param.id)

    if(isError) {
      return JSON.stringify(error.message)
    }
    return (
        <div className="w-full h-full max-w-[2048px]">
           {isLoading ? <Loading/>: <>
                <div className="flex w-full h-full">
                    <Drawer data={data.data.course}/>
                    <div className="flex items-start justify-center w-full h-full relative">
                        <BackButton/>
                        <Outlet/>
                    </div>
                </div>
            </> }
        </div>
    )
}


export const BackButton = () => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center gap-2 cursor-pointer z-20 bg-blue-400 p-2 rounded-md text-white absolute top-2 left-2" onClick={() => navigate(-1)}>
            <AiFillBackward className="text-lg"/>
            <span>Back</span>
        </div>
    )
}