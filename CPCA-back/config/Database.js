import mongoose from "mongoose";
import { dbURI } from "./constants.js";
import User from "../models/user.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("DB connected succesffully...");
  } catch (error) {
    console.error(error);
    throw new Error("error connecting to db");
  }
};

const createAdminUsers = async () => {
  const admins = [
    {
      username: "Bamlaku",
      email: "bamlaku@example.com",
      password: "bamlak123",
      role: "admin",
      isAdmin: true,
    },
    {
      username: "Yishak",
      email: "yishak@example.com",
      password: "yishak123",
      role: "admin",
      isAdmin: true,
    },
    {
      username: "Haile",
      email: "haile@example.com",
      password: "haile123",
      role: "admin",
      isAdmin: true,
    },
  ];

  for (const admin of admins) {
    const existingAdmin = await User.findOne({ email: admin.email });
    if (!existingAdmin) {
      const newAdmin = new User(admin);
      console.log(newAdmin);
      await newAdmin.save();
      console.log(`Admin user ${admin.username} created.`);
    } else {
      console.log(`Admin user ${admin.username} already exists.`);
    }
  }
};

export { connectToDB, createAdminUsers };
