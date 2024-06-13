import { MdOutlineDescription } from "react-icons/md";
import { ContentEditor } from "./contentEditor";
import { IconWrapper } from "./icon-wrapper";

export const AddDescription = ({ courseId }) => {  
  return (
    <div className=" flex flex-col gap-4 mt-4 w-fit p-4 rounded-md max-w-3xl">
      <span className="flex flex-col gap-2">
        <span className="text-xl capitalize font-medium flex gap-4 items-center">
          <IconWrapper bg="bg-blue-500" color="text-white" icon={<MdOutlineDescription />} />
          <span className="" >description</span>
        </span>
        <span className="text-xs lowercase xxs:line-clamp-1 md:line-clamp-2 text-gray-500 ">
          add course description that appears in the course list that students to see with a brief overview of the course
        </span>
      </span>
      <ContentEditor courseId={courseId}/>
    </div>
  )
}