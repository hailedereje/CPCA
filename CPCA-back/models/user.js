import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    fullName: { type: String, default: null },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String },
    role: { type: String, enum: ["student", "instructor", "admin"] },
    isAdmin: { type: Boolean, default: false },
    isInstructor: { type: Boolean, default: false },
    phoneNumber: { type: String, default: null },
    bio: { type: String, default: null },
    studentId: { type: String, default: null },
    //aditional fields to add
  },
  { timestamps: true},
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password, delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10); // 10 is the cost factor
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

userSchema.methods.matchPasswords = async function (passwordEntered) {
  // return this.password === passwordEntered;
  // console.log(this.password);
  // console.log(passwordEntered) ;
  console.log(await bcrypt.compare(passwordEntered, this.password));
  return await bcrypt.compare(passwordEntered, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
