import ClassroomSidebar from '@/components/Classroom/ClassroomSidebar'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function ClassroomLayout() {
  return (
    <div className='w-full border border-base-300 h-screen p-3'>
      {/* <div className="text-md breadcrumbs mb-6">
        <ul>
          <li>
            <Link to="/dashboard">Activities</Link>
          </li>
          <li>
            Create 
          </li>
        </ul>
      </div> */}
      {/* <ClassroomSidebar /> */}
      <Outlet />
    </div>
  )
}

export default ClassroomLayout
