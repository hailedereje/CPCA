import { Outlet } from 'react-router-dom'

function ClassroomLayout() {
  return (
    <div className='w-full h-full'>
      <Outlet />
    </div>
  )
}

export default ClassroomLayout