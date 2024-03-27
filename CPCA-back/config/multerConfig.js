import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    format: async (req, file) => "jpg", // supports promises as well
    public_id: (req, file) => {
      return file.originalname.split(".")[0];
    },
  },
});

// PDF and Other Text Files Storage Configuration
const fileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
     folder: "files",
     resource_type: "auto", // Automatically detect the resource type
     allowedFormats: ['pdf', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'], // Specify allowed formats
     public_id: (req, file) => {
       return `file-${Date.now()}-${file.originalname}`;
     },
  },
 });

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "videos",
    format: "mp4",
    public_id: (req, file) => {
      return `video-${Date.now()}-${file.originalname}`;
    },
  },
});

export { imageStorage, fileStorage, videoStorage };
