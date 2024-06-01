import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MdOutlineDescription } from "react-icons/md";
import { ContentEditor } from "./contentEditor";
import newRequests from "@/utils/newRequest";
import { courseRoutes } from "@/routes";

export const AddDescription = ({ courseId }) => {  
  return (
    <div className=" flex flex-col gap-4 mt-4 w-fit dark:bg-gray-600 p-4 rounded-md bg-slate-50">
      <span className="flex flex-col gap-2">
        <span className="text-xl capitalize font-medium flex gap-4 items-center">
          <span>
            <MdOutlineDescription />
          </span>
          <span >description</span>
        </span>
        <span className="text-xs lowercase line-clamp-2 text-gray-500 dark:text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatem perspiciatis consequatur qui numquam veniam similique rem ut esse architecto.</span>
      </span>
      <ContentEditor courseId={courseId}/>
    </div>
  )
}