import newRequests from '@/utils/newRequest';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { RiDraftLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { Loading } from './components/loader';

const DraftCourses = () => {
  const navigate = useNavigate()
    const {data: draftCourses,isLoading,isError} = useQuery({
      queryKey: ['draftCourses'],
      queryFn: () => newRequests.get("/courses/all/drafts"),
      staleTime: 1000*6*100
    })

    if(isError) {
      return <div>Error Loading Draft Courses....</div>
    }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-5xl font-bold mb-4">Draft Courses</h1>
      {isLoading ? <Loading/> : <div className="flex flex-col gap-1">
        {draftCourses.length !== 0 && draftCourses.data?.map(course => (
          <button onClick={() => navigate(`/dashboard/course/update/${course._id}`)} key={course._id} className='flex gap-3 p-2 text-blue-400 items-center'>
            <RiDraftLine size={20}/>
            <span className="text-lg font-medium ">
                {course.title}
            </span>   
          </button>
        ))}
      </div>}
    </div>
  );
};

export default DraftCourses;
