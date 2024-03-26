import React from "react";
import SectionTitle from "./SectionTitle";
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
function UploadImageFile() {
  const openUploadWidget = () => {
    const uploadOptions = {
      cloudName: cloudName, // Make sure to set this in your .env file
      uploadPreset: "course_files", // Replace with your upload preset name
      folder: "course-files", // Optional: Specify a folder for uploads
    };

    window.cloudinary
      .createUploadWidget(uploadOptions, (error, result) => {
        if (error) console.error(error);
        if (result && result.event === "success") {
            console.log(result)
            console.log(result.info); 
            
          const imageUrl = result.info.secure_url;
          // Handle successful upload: e.g., display the uploaded image URL
          console.log("Image uploaded:", imageUrl);
        }
      })
      .open();
  };

  return (
    <div>
      <SectionTitle text="Upload Image" />
      <div className="card mx-auto bg-base-100 shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-center items-center p-4">
            <button onClick={openUploadWidget}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-40 h-40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5.615 20q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h12.77q.69 0 1.152.463q.463.462.463 1.152v12.77q0 .69-.462 1.152q-.463.463-1.153.463zm0-1h12.77q.23 0 .423-.192q.192-.193.192-.423V5.615q0-.23-.192-.423Q18.615 5 18.385 5H5.615q-.23 0-.423.192Q5 5.385 5 5.615v12.77q0 .23.192.423q.193.192.423.192M7.5 16.5h9.154l-2.827-3.77l-2.615 3.308l-1.75-2.115zM5 19V5zm3.5-9.5q.413 0 .707-.293q.293-.294.293-.707t-.293-.707Q8.913 7.5 8.5 7.5t-.707.293Q7.5 8.087 7.5 8.5t.293.707q.294.293.707.293"
                />
              </svg>
              <p className="text-center mt-2 text-gray-600">
                Upload Your Image Here
              </p>
            </button>
          </div>
          <div className="p-4">
            <h3 className="mb-2 text-lg font-bold">Image Specifications</h3>
            <ul className="list-disc space-y-2">
              <li>File format: JPG, PNG, or GIF</li>
              <li>Maximum file size: 5MB</li>
              <li>Minimum dimensions: 800x600 pixels</li>
              <li>Recommended aspect ratio: 16:9</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImageFile;
