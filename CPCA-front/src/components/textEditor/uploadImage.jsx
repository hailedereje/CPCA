import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTopic } from "@/features/course/topicSlice";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";
import { AiOutlineLoading3Quarters, AiOutlineCloudUpload, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { useUploadCourseImage } from "../createCourse/hooks/course-hooks";
import { useQueryClient } from "@tanstack/react-query";
import { IconWrapper } from "../createCourse/components/icon-wrapper";
import { CiImageOn } from "react-icons/ci";

export const UploadImage = ({id,img}) => {
  const client = useQueryClient();
  const data = client.getQueryData(['course', id]).data.course
 
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(data.templateImg  );
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: uploadImage } = useUploadCourseImage(id)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async (e, idx) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "dgyt48cy");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dygzy1vri/image/upload", formData);
      await uploadImage({courseId:id,url:response.data.secure_url}) 
      setImageUrl(response.data.secure_url);
      setImage(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="flex flex-col items-center gap-4 bg-gray-600 rounded-md p-4 max-w-md">
      <span className="flex flex-col gap-2">
          <span className="text-xl capitalize font-medium flex gap-4 items-center">
            <IconWrapper bg="bg-blue-500" color="text-white" icon={<CiImageOn />} />
            <span >course image</span>
          </span>
          <span className="text-xs lowercase xxs:line-clamp-1 md:line-clamp-2 text-gray-500 dark:text-gray-200"> add course image that appears in the course list that students to see </span>
        </span>
      {!imageUrl ? (
        <>
          <label htmlFor="image-file" className="cursor-pointer p-2 flex flex-col items-center justify-center w-full border border-dashed border-white rounded-lg  transition-colors duration-300">
            <AiOutlineCloudUpload size={40} className="text-blue-500 dark:text-white" />
            <span className="mt-2 text-blue-500 dark:text-white">Upload Image</span>
          </label>
          <input type="file" id="image-file" hidden onChange={handleFileChange} />
        </>
      ) : (
        <div className="relative w-fit">
          <img src={imageUrl} className="object-cover w-full h-full rounded-md " alt="Uploaded" />
          <label htmlFor="image-file" className="absolute cursor-pointer top-2 right-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-full p-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <AiOutlineEdit size={20} />
          </label>
          <input type="file" id="image-file" hidden onChange={handleFileChange} />
        </div>
      )}

      {image && (
        <div className="fixed z-20 flex items-center justify-center top-0 left-0 w-screen h-screen bg-black/60">
          <div className="relative z-30 flex flex-col items-center gap-4 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <div className="relative w-full h-64">
              <img src={URL.createObjectURL(image)} className="object-contain w-full h-full rounded-md" alt="Selected" />
            </div>
            <div className="flex gap-4 w-full">
              <button
                onClick={(e) => handleUpload(e, 0)}
                type="button"
                className="flex items-center justify-center gap-2 flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {isUploading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <AiOutlineCloudUpload />}
                <span>{isUploading ? "Uploading..." : "Upload"}</span>
              </button>
              <button
                onClick={() => setImage(null)}
                type="button"
                className="flex items-center justify-center gap-2 flex-1 text-red-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                <AiOutlineClose />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
