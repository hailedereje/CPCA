import React from "react";
import SectionTitle from "./SectionTitle";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

function UploadVideoFile() {
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
          console.log(result);
          console.log(result.info);
          const imageUrl = result.info.secure_url;
          // Handle successful upload: e.g., display the uploaded image URL
          console.log("Video uploaded:", imageUrl);
        }
      })
      .open();
  };

  return (
    <div>
      <SectionTitle text="Upload Video" />
      <div className="card mx-auto bg-base-100 shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-center items-center p-4">
            <button onClick={openUploadWidget}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-40 h-40"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="m162.22 108.67l-48-32A4 4 0 0 0 108 80v64a4 4 0 0 0 2.11 3.53a4 4 0 0 0 4.11-.2l48-32a4 4 0 0 0 0-6.66M116 136.53V87.47L152.79 112ZM216 44H40a12 12 0 0 0-12 12v112a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12m4 124a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Zm8 40a4 4 0 0 1-4 4H32a4 4 0 0 1 0-8h192a4 4 0 0 1 4 4"
                />
              </svg>
              ;
              <p className="text-center mt-2 text-gray-600">
                Upload Your Video Here
              </p>
            </button>
          </div>
          <div className="p-4">
            <h3 className="mb-2 text-lg font-bold">Video Specifications</h3>
            <ul className="list-disc space-y-2">
              <li>File format: MP4</li>
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

export default UploadVideoFile;

