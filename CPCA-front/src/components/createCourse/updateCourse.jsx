import { Link, useParams } from "react-router-dom";
import { defaultFroalaConfig } from "@/constants";
import { useDispatch } from "react-redux";
import FroalaEditor from "react-froala-wysiwyg";
import { useState } from "react";
import { MdOutlineDescription } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequests from "@/utils/newRequest";
import { Tags } from "./components/addTags";
import { Prerequisites } from "./components/addPrerequisites";
import { courseRoutes } from "@/routes";
import { AddDescription } from "./components/addDescription";
import { AddObjective } from "./components/addObjective";
import { Loading } from "./components/loader";
import { RiAddLine } from "react-icons/ri";
import { CourseName } from "./components/courseName";
import { UploadImage } from "../textEditor/uploadImage";



export const UpdataCourse = () => {
  const param = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['course', param.id],
    queryFn: () => newRequests.get(`/courses/course`, {
      params: {
        id: param.id
      }
    }),
    staleTime: 1000 * 6 * 500
  })
  return (
    <>
      {isLoading ?
        <Loading />
        :
        <div className="w-full flex dark:text-white gap-6 p-2 ">
          <div className="">
            <div className="flex gap-4 flex-col md:flex-row">
              <UploadImage id={param.id} img={data.data.course.templateImg} />
              <Tags courseId={param.id} />
            </div>
              <AddDescription courseId={param.id} />
            `</div>
            <div className="flex flex-col w-full dark:bg-gray-600">
              <CourseComponent course={data.data.course}/>
            </div>
          
        </div>
      }
    </>

  )
}

import React from 'react';
import { FaBook, FaEdit } from "react-icons/fa";

const CourseComponent = ({ course }) => {
  return (
    <div className="max-w-4xl max-h-screen overflow-auto editor w-full">
      <div className="w-full p-2 flex justify-between items-center gap-2 bg-blue-500">
        <div className="flex gap-2 items-center">
          <span><FaBook/></span>
          <h1 className="text-xl capitalize text-center">{course.title}</h1>
        </div>
        
        <Link to={"chapters"}>
          <FaEdit/>
          </Link >
      </div>
      
      {course.chapters.map((chapter) => (
        <div key={chapter._id} className="">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer text-md capitalize font-normal text-blue-900 bg-blue-100 p-2 hover:bg-blue-200 ">
              <span>{chapter.title}</span>
              <svg
                className="w-5 h-5 text-blue-500 transform transition-transform duration-200 group-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pt-4 pb-2 text-sm text-gray-600">
              <ul className="list-disc list-inside flex flex-col gap-1">
                {chapter.lessons.map((lesson) => (
                  <li key={lesson._id} className="w-full flex items-center shadow-sm dark:hover:bg-gray-500 p-1">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 20l9-5-9-5-9 5 9 5zM12 12l9-5-9-5-9 5 9 5z"
                      />
                    </svg>
                    <span className="dark:text-white text-sm capitalize">{lesson.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
};

