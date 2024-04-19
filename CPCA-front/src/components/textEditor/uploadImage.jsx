import { useState } from "react"
import { Button } from "../ui/button"

export const UploadImage = ({idx, topic}) => {
  
  const [image,setImage] = useState()

  return (
      <>
        {image && <div className={`fixed z-20 flex items-center justify-center top-0 left-0 w-screen h-screen  transform transition-all duration-500 ${image ? 'scale-100':'scale-40 hidden'}`}>
          {console.log(idx)}
          <div onClick={() => setImage('')}  className="absolute top-0 left-0 w-full h-full bg-black/60" />
          <div className="flex flex-col items-center justify-between z-10 gap-4 w-1/2 duration-300 bg-white p-3 rounded-md">
            <img src={URL.createObjectURL(image)} className="max-w-[400px] max-h-[400px]" alt="" />
            <div className="flex gap-5">
              <button onClick={(e) => console.log(idx)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                upload
              </button>
              <Button onClick={() => setImage('')} >upload</Button>

              <button onClick={() => setImage('')} type="button" class="text-red-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   dark:border-gray-600 dark:hover:bg-white-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                cancel
              </button>
            </div>

          </div>
        </div>}
      </>
  )
}