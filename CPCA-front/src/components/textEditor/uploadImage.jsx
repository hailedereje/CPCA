import {  useTransition } from "react"
import { useDispatch } from "react-redux";
import { addTopic } from "@/features/course/topicSlice";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// eslint-disable-next-line react/prop-types
export const UploadImage = ({image,setImage,idx}) => {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch()
  const handleUpload = (e, idx) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "dgyt48cy");

    async () => await axios.post("https://api.cloudinary.com/v1_1/dygzy1vri/image/upload",  formData)
      .then((response) => {
        const topic = { id:nanoid(),order:0,name:"image", content:response.data.secure_url,show:false }
        dispatch(addTopic({ idx, topic }))
      })
      .catch((error) => {
        console.log(error);
      })
    
  };
// console.log(isPending)
  return (
      <>
        {image && <div onSubmit={handleUpload} className={`fixed z-20 flex items-center justify-center top-0 left-0 w-screen h-screen  transform transition-all duration-500 ${image ? 'scale-100':'scale-40 hidden'}`}>
          <div onClick={() => setImage('')}  className="absolute top-0 left-0 w-full h-full bg-black/60" />
          <div className="flex flex-col items-center justify-between z-10 gap-4 w-1/2 duration-300 bg-white p-3 rounded-md">
            <img src={URL.createObjectURL(image)} className="max-w-[200px]" alt="" />
            <div className="flex gap-5">
              <button onClick={(e) => handleUpload(e,idx)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              <span>upload</span>
              </button>
              <button onClick={() => setImage('')} type="button" className="text-red-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   dark:border-gray-600 dark:hover:bg-white-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                cancel
              </button>
            </div>

          </div>
        </div>}
      </>
  )
}