import { courseRoutes } from "@/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContentEditor } from "./contentEditor";
import newRequests from "@/utils/newRequest";


const addObjective = async (data) => {
    return await newRequests.post(courseRoutes.addObjective, data)
  }

export const AddObjective = ({ courseId }) => {

    const client = useQueryClient();
  const initialValue = client.getQueryData(['course', courseId])

  const { mutateAsync: postObjective, isPending } = useMutation({
    mutationFn: addObjective,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['course', courseId] })
    }
  })

  const action = async (data) => {
    try {
      await postObjective(data).then(result => {
        console.log(result)
      }).catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }

  }

    return (
        <div className="flex flex-col gap-2 mt-4">
          <span className="flex flex-col gap-2">
            <span className="text-xl capitalize font-medium flex gap-4 items-center">
              <span>
                <svg className="font-bold w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                  <path fill="currentColor" d="M2048 256v759q-28-35-60-67t-68-59V384H128v1152h612q3 32 8 64t14 64H0V256zm-576 640q119 0 224 45t183 124t123 183t46 224q0 119-45 224t-124 183t-183 123t-224 46q-119 0-224-45t-183-124t-123-183t-46-224q0-119 45-224t124-183t183-123t224-46m0 1024q93 0 174-35t142-96t96-142t36-175q0-93-35-174t-96-142t-142-96t-175-36q-93 0-174 35t-142 96t-96 142t-36 175q0 93 35 174t96 142t142 96t175 36m-64-768h128v384h-128zm0 512h128v128h-128z" />
                </svg>
              </span>
              <span >objective</span>
            </span>
            <span className="text-xs lowercase line-clamp-2 text-gray-500 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatem perspiciatis consequatur qui numquam veniam similique rem ut esse architecto.</span>
          </span>
          <ContentEditor action={action} courseId={courseId} initialValue={initialValue.data.course.objective} isPending={isPending} />
        </div>
    )
}