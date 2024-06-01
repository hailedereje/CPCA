import { defaultFroalaConfig } from "@/constants"
import { useState } from "react"
import FroalaEditor from "react-froala-wysiwyg"
import 'froala-editor/css/themes/dark.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { AiOutlineEdit } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddDescription } from "../hooks/course-hooks";

export const ContentEditor = ({courseId }) => {
    const client = useQueryClient();
    const initialValue = client.getQueryData(['course', courseId]).data.course.description 

    const [value, setValue] = useState(initialValue)
    const [isEditing, setIsEditing] = useState(false)

    const { mutateAsync: postDescription, isPending } = useAddDescription(courseId)
  
    const action = async (data) => {
      try {
        await postDescription(data)
      } catch (error) {
        console.log(error)
      }finally{
        setIsEditing(false)
      }
  
    }

    return (
      <div className="flex flex-col w-full editor gap-3">
        {isEditing ? 
        <div className={`w-full relative`}>
          <div className={`fixed z-30 flex items-center justify-center top-0 left-0 w-screen h-screen`}>
            <div onClick={() => setIsEditing(false)} className="absolute top-0 left-0 w-full h-full bg-black/50" />
            <div className="flex items-center justify-center gap-4 w-1/2 xxs:w-full lg:max-w-2/3 min-w-[300px] p-2  relative ">
              <FroalaEditor tag='div'
                model={value}
                config={defaultFroalaConfig}
                onModelChange={(editorValue) => setValue(editorValue)}
              />
              <div className="absolute top-3 right-0 flex z-10 items-center justify-center gap-6">
              <button
                type='button'
                className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2"
                onClick={() => {
                  action({courseId, description:value })
                }}
              >
                {isPending ?  "saving":"save"}
              </button>
              </div>
            </div>
          </div>
        </div> : 
        <div className="min-h-16 w-full overflow-auto editor border relative p-4 rounded-md text-sm text-gray-100">
        <FroalaEditorView model={value} />
        <button className="absolute right-0 top-0 p-2 rounded-full bg-black/40" onClick={() => setIsEditing(true)}>
          <AiOutlineEdit size={20} className="text-blue-400" />
        </button>
      </div>
        }
        
      </div>
    )
  }