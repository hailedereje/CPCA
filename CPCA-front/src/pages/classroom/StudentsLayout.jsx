import { Outlet, useOutletContext } from 'react-router-dom'

function StudentsLayout() {
    const {classroom, refetch} = useOutletContext() 
  return (
    <div>
      <Outlet context={{classroom, refetch}}/>
    </div>
  )
}

export default StudentsLayout
