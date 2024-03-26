import React from 'react'
import {Outlet} from 'react-router-dom'
import { BigSidebar, Navbar, SmallSidbar } from '../../components';

function InstructorDashboardLayout() {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
 );
  
}

export default InstructorDashboardLayout
