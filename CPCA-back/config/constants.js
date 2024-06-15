import dotenv from "dotenv";
dotenv.config();
const dbURI = process.env.dbURI || "mongodb+srv://bamlakuhiruy:bam4774@cluster0.4x1rqqo.mongodb.net/cpca?retryWrites=true&w=majority"

const TOKEN_KEY = process.env.TOKEN_KEY || "mytokenkey";
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || "30d";
const NODE_ENV = process.env.NODE_ENV || "production";
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || "localhost"; // for development

// const courseStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "courseFiles",
//   allowedFormats: ["jpg", "png", "gif", "mp4", "webm"],
//   params: {
    // Additional parameters can be defined here
//   },
// });



export {
  dbURI,
  TOKEN_KEY,
  TOKEN_EXPIRY,
  NODE_ENV,
  COOKIE_DOMAIN,
};