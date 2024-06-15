import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ActionTypes } from "../action.Types";
import { InputList } from "./input-list";
import { useSelector } from "react-redux";
import newRequests from "@/utils/newRequest";
import { IconWrapper } from "./icon-wrapper";
import { GrUserAdmin } from "react-icons/gr";
import { showErrorToast, showSuccessToast } from "@/toasts/toast";

  export const Instructors = ({courseId}) => {
    const client = useQueryClient();
    const { instructors } = useSelector(x => x.createCourseState)
    
    const {data: instructorList, isSuccess} = useQuery({
      queryKey: 'instructors',
      queryFn: () => newRequests.get('/user/instructors'),
      retry: 3,
      staleTime: 1000 * 60 * 500
    })
  
    const {mutateAsync:postInstructors,isPending } = useMutation({
      mutationFn: (data) => newRequests.post("/user/instructors/course",data),
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ['course',courseId]})
        showSuccessToast("Instructors added successfully")
      },
      onError: () => {
        showErrorToast("Failed adding instructors")
      }

    })
  
    const onSubmite =  async () =>{
      await postInstructors({courseId,instructors: instructors.map(ins => (ins.id))})
    }
    
    console.log(instructors)
    return (
      <div className="flex flex-col items-start w-full gap-4 bg-slate-50 p-4 rounded-md ">
        <span className="flex flex-col gap-2">
          <span className="text-xl capitalize font-medium flex gap-4 items-center">
            <IconWrapper bg="bg-blue-500" color="text-white" icon={<GrUserAdmin />}/>
            <span >Instructors</span>
          </span>
          <span className="text-xs lowercase line-clamp-2 text-gray-500 ">
            Assign instructors to the course. Instructors will have access to the course and can manage the course content.
          </span>
        </span>
        {isSuccess && <div className="w-full bg-white">
          <InputList items={instructorList.data.map(ins => ({id: ins._id,title:ins.email}))} type={ActionTypes.ADD_INSTUCTOR} courseId={courseId}/>
        </div> }

        <button onClick={onSubmite} className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2">
           {isPending ? "saving..":"save"}
        </button>
      </div>
    )
  }