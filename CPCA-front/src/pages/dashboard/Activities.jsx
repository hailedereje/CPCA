import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiBookAdd } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";

function Activities() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="card border border-base-100 p-3 bg-base-100">
        <figure>
          <IoMdAddCircleOutline size={50} />
        </figure> 
        <div className="card-body">
          <h2 className="text-2xl text-info">Add Course</h2>
          <button className="btn btn-primary mt-4">Add</button>
        </div>
      </div>
      <div className="card border border-base-100 p-3 bg-base-100 shadow-xl hover:shadow-2xl ">
        <figure>
          <BiBookAdd size={50} />
        </figure>
        <div className="card-body">
          <h2 className="text-2xl text-info">Add Lesson</h2>
          <button className="btn btn-primary mt-4">Add</button>
        </div>
      </div>
      <div className="card border border-base-100 p-3 bg-base-100 shadow-xl hover:shadow-2xl">
        <figure>
          <FaChalkboardTeacher size={50} />
        </figure>
        <div className="card-body">
          <h2 className="text-2xl text-info">Manage                                     Courses</h2>
          <button className="btn btn-primary mt-4">Go</button>
        </div>
      </div>
      <div className="card border border-base-100 p-3 bg-base-100 shadow-xl hover:shadow-2xl">
        <figure>
          <AiOutlineFileAdd size={50} />
        </figure>
        <div className="card-body">
          <h2 className="text-2xl text-info">Add Files</h2>
          <button className="btn btn-primary mt-4">Add</button>
        </div>
      </div>
      <div className="card border border-base-100 p-3 bg-base-100 shadow-xl hover:shadow-2xl">
        <figure>
          <BsFillPeopleFill size={50} />
        </figure>
        <div className="card-body">
          <h2 className="text-2xl text-info">Manage Students</h2>
          <button className="btn btn-primary mt-4">Go</button>
        </div>
      </div>
      <div className="card border border-base-100 p-3 bg-base-100 shadow-xl hover:shadow-2xl">
        <figure>
          <GiTeacher size={50} />
        </figure>
        <div className="card-body">
          <h2 className="text-2xl text-info">Manage Teachers</h2>
          <button className="btn btn-primary mt-4">Go</button>
        </div>
      </div>
    </div>
  )
}

export default Activities