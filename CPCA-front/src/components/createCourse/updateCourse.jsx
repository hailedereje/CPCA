import { useLocation, useNavigation } from "react-router-dom";
import { InputList } from "./components/input-list";
import { courseList, defaultFroalaConfig, tagList } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import FroalaEditor from "react-froala-wysiwyg";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";
import { addPrerequistes } from "@/features/course/createCourse";
import { ActionTypes } from "./action.Types";

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
                dispatch(addInstruction({instruction:content}))
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
export const UpdataCourse = () => {
    const { course,prerequisites } = useSelector(x => x.createCourseState)

    const dispatch = useDispatch()
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const id = pathSegments[pathSegments.length - 1]
    console.log(prerequisites)
    
    return (
        <div className="w-full max-w-2xl flex flex-col gap-4 p-2">     
            <div className="flex items-end w-full gap-2">
                <div className="w-full">
                   <span className="text-md font-medium capitalize">prerequisites</span>
                    <InputList items={courseList} type={ActionTypes.ADD_PREREQUISITES}/> 
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2" onClick={() => dispatch(addPrerequistes({prere}))}>
                        save
                </button>
            </div>

            <div className="flex items-end w-full gap-2">
                <div className="w-full">
                   <span className="text-md font-medium capitalize">tags</span>
                    <InputList items={tagList} type={ActionTypes.ADD_TAGS}/> 
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2">
                     save
                </button>
            </div> 
            <div className="">
                <ObjectivesEditor/>
            </div>
        </div>
    )
}