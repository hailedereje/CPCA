import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActionTypes } from "../action.Types";
import { InputList } from "./input-list";
import { useSelector } from "react-redux";
import newRequests from "@/utils/newRequest";

const addPrerequistes = async(data) => {
    return await newRequests.post("/courses/add-prerequisites",data)
  }
  export const Prerequisites = ({courseId}) => {
    const client = useQueryClient();
    const { prerequisites } = useSelector(x => x.createCourseState)
    
    const courseList = client.getQueryData(['courseListFilter'])
  
    const {mutateAsync:postPrerequisites,isPending } = useMutation({
      mutationFn: addPrerequistes,
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ['course',courseId]})
      }
    })
  
    const onSubmite =  async () =>{
      await postPrerequisites({courseId,prerequisites}).then((result) => {
          console.log(result)
      }).catch(err => {
          console.log(err)
      })    
  }
  
    return (
      <div className="flex flex-col items-start w-full gap-4 bg-slate-50 p-4 rounded-md dark:bg-gray-600">
        <span className="flex flex-col gap-2">
          <span className="text-xl capitalize font-medium flex gap-4 items-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                <path fill="currentColor" fill-rule="evenodd" d="M3 2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h5.25a.75.75 0 0 1 0 1.5H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6.25a.75.75 0 0 1-1.5 0V3a.5.5 0 0 0-.5-.5zm12.28 8.72a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.97-1.97a.75.75 0 0 1 1.06 0M4.75 4a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zM4 8a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 8m.75 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5z" clip-rule="evenodd" />
              </svg>
            </span>
            <span >prerequisites</span>
          </span>
          <span className="text-xs lowercase line-clamp-2 text-gray-500 dark:text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatem perspiciatis consequatur qui numquam veniam similique rem ut esse architecto.</span>
        </span>
        {<div className="w-full bg-white">
          <InputList items={courseList.data} type={ActionTypes.ADD_PREREQUISITES} courseId={courseId}/>
        </div> }
        <button onClick={onSubmite} className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2">
           {isPending ? "saving..":"save"}
        </button>
      </div>
    )
  }