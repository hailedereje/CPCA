import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

function StudentsLayout() {
    const {classroom} = useOutletContext() 
  return (
    <div>
      <Outlet context={{classroom}}/>
    </div>
  )
}

export default StudentsLayout
