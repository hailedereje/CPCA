import { Link, useParams } from "react-router-dom";
import { defaultFroalaConfig } from "@/constants";
import { useDispatch } from "react-redux";
import FroalaEditor from "react-froala-wysiwyg";
import { useState } from "react";
import { MdOutlineDescription } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequests from "@/utils/newRequest";
import { Tags } from "./components/addTags";
import { Prerequisites } from "./components/addPrerequisites";
import { courseRoutes } from "@/routes";
import { AddDescription } from "./components/addDescription";
import { AddObjective } from "./components/addObjective";
import { Loading } from "./components/loader";
import { RiAddLine } from "react-icons/ri";
import { CourseName } from "./components/courseName";



export const UpdataCourse = () => {
  const [courseName,setCourseName] = useState("")
  const param = useParams()
  const {data, isLoading } = useQuery({
    queryKey: ['course', param.id],
    queryFn: () => newRequests.get(`/courses/course`, {
      params: {
        id: param.id
      }
    }),
    staleTime: 1000 * 6 * 500
  })

  return (
    <>
      {isLoading ? <Loading /> : <div className="w-full max-w-2xl dark:text-white flex flex-col gap-6 p-2 ">
        <CourseName courseId={param.id} />
        <Prerequisites courseId={param.id} />
        <Tags courseId={param.id} />
        <AddDescription courseId={param.id} />
        <Link 
          to="chapters" 
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white text-md py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl w-max mx-auto"
        >
          <RiAddLine size={20} className="mr-2" />
            Edit Course Content
        </Link>
      </div>
      }
    </>

  )
}

