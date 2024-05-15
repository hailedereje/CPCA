import { useLoaderData, useLocation, useNavigation, useParams } from "react-router-dom";
import { InputList } from "./components/input-list";
import { courseList, defaultFroalaConfig, tagList } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import FroalaEditor from "react-froala-wysiwyg";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";
import { ActionTypes } from "./action.Types";
import { MdOutlineDescription } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { CiSquareQuestion } from "react-icons/ci";
import { store } from "@/store";
import { api, useAddPrerequistesMutation } from "@/api";
import { toast } from "react-toastify";

const ObjectivesEditor = () => {
  // const { instruction } = useSelector(x => x.quizState)
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const isChanged = "true" !== value

  return (
    <div className="flex flex-col w-fit editor gap-3">
      <div className={`w-full relative`}>
        <FroalaEditor tag='div'
          model={value}
          config={defaultFroalaConfig}
          onModelChange={(content) => setValue(content)
          }
        />
        <div className="absolute top-3 right-0 flex z-10 items-center justify-center gap-6">
          {isChanged &&
            <button
              type='button'
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2"
              onClick={() => {
                const content = DOMPurify.sanitize(value)
                dispatch(addInstruction({ instruction: content }))
                setValue(content)
              }}
            >
              save
            </button>}
        </div>
      </div>
    </div>
  )
}
export const UpdataCourse = ({ courseId="664465b0461fb9b090ceb621" }) => {

  const { prerequisites, tags } = useSelector(x => x.createCourseState)
  const params = useParams()

  const dispatch = useDispatch()
  const location = useLocation();



  return (
    <div className="wfull max-w-2xl flex flex-col gap-6 p-2 ">
      <Prerequisites courseId={courseId}/>
      <div className="flex flex-col items-start w-full gap-4 bg-slate-50 p-4 rounded-md">
        <span className="flex flex-col gap-2">
          <span className="text-xl capitalize font-medium flex gap-4 items-center">
            <span>
              <FaHashtag />
            </span>
            <span >tags</span>
          </span>
          <span className="text-xs lowercase line-clamp-2 text-gray-500 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatem perspiciatis consequatur qui numquam veniam similique rem ut esse architecto.</span>
        </span>
        <div className="w-full bg-white">
          <InputList items={tagList} type={ActionTypes.ADD_TAGS} courseId={courseId} />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2">
          save
        </button>
      </div>
      <div className=" flex flex-col gap-4 mt-4">
        <span className="flex flex-col gap-2">
          <span className="text-xl capitalize font-medium flex gap-4 items-center">
            <span>
              <MdOutlineDescription />
            </span>
            <span >description</span>
          </span>
          <span className="text-xs lowercase line-clamp-2 text-gray-500 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatem perspiciatis consequatur qui numquam veniam similique rem ut esse architecto.</span>
        </span>
        <ObjectivesEditor />
      </div>
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
        <ObjectivesEditor />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white text-md py-2 px-2 rounded mr-2">
        add chapters
      </button>
    </div>
  )
}

export const Prerequisites = ({courseId}) => {
  const [addPrerequisites, { isLoading }] = useAddPrerequistesMutation();
  const { prerequisites } = useSelector(x => x.createCourseState)
  const data = prerequisites?.map(x => x.name)
  const submitePrerequisites = async (e) => {
    e.preventDefault();
    try {
          const  result = await addPrerequisites({ courseId,prerequisites:data})
      if (result) {

        await db.table('courses').update(courseId, { prerequisites: result.data.prerequisites}).then(data => console.log(data)).catch(err => console.log(...err))
        toast.success("course created successfully")
        console.log(result.data)
      }
    } catch (err) {
      console.log(err)
      const errMessage = err?.data?.msg || "server Error . please try again"
      toast.error(errMessage)
    }
  }
  return (
    <div className="flex flex-col items-start w-full gap-4 bg-slate-50 p-4 rounded-md">
      <span className="flex flex-col gap-2">
        <span className="text-xl capitalize font-medium flex gap-4 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
              <path fill="currentColor" fill-rule="evenodd" d="M3 2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h5.25a.75.75 0 0 1 0 1.5H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6.25a.75.75 0 0 1-1.5 0V3a.5.5 0 0 0-.5-.5zm12.28 8.72a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.97-1.97a.75.75 0 0 1 1.06 0M4.75 4a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zM4 8a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 8m.75 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5z" clip-rule="evenodd" />
            </svg>
          </span>
          <span >prerequisites</span>
        </span>
        <span className="text-xs lowercase line-clamp-2 text-gray-500 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatem perspiciatis consequatur qui numquam veniam similique rem ut esse architecto.</span>
      </span>
      <div className="w-full bg-white">
        <InputList items={courseList} type={ActionTypes.ADD_PREREQUISITES} courseId={courseId}/>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2" onClick={submitePrerequisites}>
        {isLoading ? "loading":"save"}
      </button>
    </div>
  )
}