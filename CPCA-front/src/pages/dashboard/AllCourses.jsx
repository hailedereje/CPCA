import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { AllCoursesGrid, CourseContent } from '../../components'
import { api } from '../../api'


export const loader = async (store) => {
  try {
    const response = await store.dispatch(api.endpoints.getAllCourses.initiate()).unwrap();
    console.log(response);
  } catch (error) {
    console.error('Failed to load all courses:', error);
  }
}
function AllCourses() {
  return (
    <div>
      <AllCoursesGrid />
    </div>
  )
}

export default AllCourses
