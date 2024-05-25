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



export const UpdataCourse = () => {
 
  const param = useParams()
  const { isLoading } = useQuery({
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
      {isLoading ? <Loading/> : <div className="w-full max-w-2xl dark:text-white flex flex-col gap-6 p-2 ">
        <Prerequisites courseId={param.id} />
        <Tags courseId={param.id} />
        <AddDescription courseId={param.id}/>
        <Link to={"chapters"} className="bg-blue-500 hover:bg-blue-700 text-white text-md py-2 px-2 rounded mr-2">
          add chapters
        </Link>
      </div>}
    </>

  )
}

