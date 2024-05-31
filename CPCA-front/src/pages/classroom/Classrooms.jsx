import { useGetClassroomsByInstructorIdQuery } from '@/api';
import React from 'react';
import { useSelector } from 'react-redux';

function Classrooms() {
  const {user} = useSelector(store => store.userState); // Get the current user from the Redux store
  const instructorId = user?._id; // Assuming the user object contains the instructor's ID
  const { data: classrooms, error, isLoading } = useGetClassroomsByInstructorIdQuery(instructorId);

  console.log(classrooms);
  console.log('user', user);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading classrooms</div>;
  }

  return (
    <div>
      <h1>Classrooms</h1>
      <div className="classrooms-container">
        {classrooms?.map((classroom) => (
          <div key={classroom.id} className="classroom-card">
            <h2>{classroom.name}</h2>
            <p>{classroom.description}</p>
            {/* Add more classroom details as needed */}
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classrooms;
