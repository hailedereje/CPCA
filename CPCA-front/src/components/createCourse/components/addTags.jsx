import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { InputList } from "./input-list";
import { ActionTypes } from "../action.Types";
import newRequests from "@/utils/newRequest";
import { FaHashtag } from "react-icons/fa";
import { tagList } from "@/constants";
import { courseRoutes } from "@/routes";

const addTags = async (data) => {
    return await newRequests.post(courseRoutes.addTags,data)
  }
  export const Tags = ({courseId}) => {
    const client = useQueryClient();
    const { tags } = useSelector(x => x.createCourseState)
  
    const { mutateAsync: postTags, isPending } = useMutation({
      mutationFn: addTags,
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ['course',courseId]})
      }
    })
  
    const onSubmit = async () => {
      console.log(tags)
      await postTags({tags,courseId}).then(data => {
        console.log(data)
      }).catch(err => console.error(err))
    }
    return (
      <div className="flex flex-col items-start  gap-4 bg-slate-50 dark:bg-gray-600 p-4 rounded-md">
          <span className="flex flex-col gap-2">
            <span className="text-xl capitalize font-medium flex gap-4 items-center">
              <span>
                <FaHashtag />
              </span>
              <span >tags</span>
            </span>
            <span className="text-xs lowercase line-clamp-2 text-gray-500 dark:text-gray-200">
            Assign relevant tags to categorize and identify the course easily. Use descriptive keywords to enhance searchability and organization              </span>
          </span>
          <div className="w-full bg-white">
            <InputList items={tagList} type={ActionTypes.ADD_TAGS} courseId={courseId} />
          </div>
          <button onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2">
            {isPending ? "saving": "save"}
          </button>
        </div>
    )
  }