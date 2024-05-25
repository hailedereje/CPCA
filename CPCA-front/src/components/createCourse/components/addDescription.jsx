import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MdOutlineDescription } from "react-icons/md";
import { ContentEditor } from "./contentEditor";
import newRequests from "@/utils/newRequest";
import { courseRoutes } from "@/routes";

const addDescription = async (data) => {
  return await newRequests.post(courseRoutes.addDescription, data)
}

export const AddDescription = ({ courseId }) => {

  const client = useQueryClient();
  const initialValue = client.getQueryData(['course', courseId])

  const { mutateAsync: postDescription, isPending } = useMutation({
    mutationFn: addDescription,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['course', courseId] })
    }
  })

  const action = async (data) => {
    try {
      await postDescription(data).then(result => {
        console.log(result)
      }).catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className=" flex flex-col gap-4 mt-4 w-fit dark:bg-gray-600 p-4 rounded-md bg-slate-50">
      <span className="flex flex-col gap-2">
        <span className="text-xl capitalize font-medium flex gap-4 items-center">
          <span>
            <MdOutlineDescription />
          </span>
          <span >description</span>
        </span>
        <span className="text-xs lowercase line-clamp-2 text-gray-500 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatem perspiciatis consequatur qui numquam veniam similique rem ut esse architecto.</span>
      </span>
      <ContentEditor action={action} courseId={courseId} initialValue={initialValue.data.course.description} isPending={isPending} />
    </div>
  )
}