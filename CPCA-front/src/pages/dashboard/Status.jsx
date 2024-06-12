import newRequests from '@/utils/newRequest'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const getStudentPerformance = () => newRequests.get('/analytics/student-data')

function Status() {
  const {data} = useQuery({
    queryKey: ['status'],
    queryFn: () => getStudentPerformance
  })
  return (
    <div>
      status goes here
    </div>
  )
}

export default Status
