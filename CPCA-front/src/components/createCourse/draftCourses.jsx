import React, { useState, useEffect } from 'react';
import { RiDraftLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DraftCourses = () => {
    const { draftCourses } = useSelector(x => x.createCourseState)
    console.log(draftCourses)

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-5xl font-bold mb-4">Draft Courses</h1>
      <div className="flex flex-col gap-1">
        {/* Mapping over the list of courses */}
        {draftCourses.length !== 0 && draftCourses?.map(course => (
          <Link to={`/course/${course.id}`} key={course.id} className='flex gap-3 p-2 text-blue-400 items-center'>
            <RiDraftLine size={20}/>
            <span className="text-lg font-medium line-clamp-1">
                {course.title}
            </span>   
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DraftCourses;
