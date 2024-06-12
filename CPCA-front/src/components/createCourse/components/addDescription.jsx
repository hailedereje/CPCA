import { MdOutlineDescription } from "react-icons/md";
import { ContentEditor } from "./contentEditor";
import { IconWrapper } from "./icon-wrapper";

export const AddDescription = ({ courseId }) => {  
  return (
    <div className=" flex flex-col gap-4 mt-4 w-fit p-4 rounded-md ">
      <span className="flex flex-col gap-2">
        <span className="text-xl capitalize font-medium flex gap-4 items-center">
          <IconWrapper bg="bg-blue-500" color="text-white" icon={<MdOutlineDescription />} />
          <span className="" >description</span>
        </span>
        <span className="text-xs lowercase xxs:line-clamp-1 md:line-clamp-2 text-gray-500 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatem perspiciatis consequatur qui numquam veniam similique rem ut esse architecto.</span>
      </span>
      <ContentEditor courseId={courseId}/>
    </div>
  )
}