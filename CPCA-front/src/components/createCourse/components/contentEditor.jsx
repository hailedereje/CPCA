import { defaultFroalaConfig } from "@/constants"
import { useState } from "react"
import FroalaEditor from "react-froala-wysiwyg"
import 'froala-editor/css/themes/dark.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css';

export const ContentEditor = ({courseId, initialValue, action,isPending }) => {
    const [value, setValue] = useState(initialValue)
  
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
    )
  }