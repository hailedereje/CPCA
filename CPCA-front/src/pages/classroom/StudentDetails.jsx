import { useGetChaptersProgressQuery } from "@/api";
import React from "react";
import { useOutletContext, useParams } from "react-router-dom";

function StudentDetails() {
  const { studentId } = useParams();
  const { classroom } = useOutletContext();

  const { data: chaptersProgress, isLoading: chaptersLoading, error: chaptersError } = useGetChaptersProgressQuery({
    classroomId: classroom._id,
    courseId: classroom.courseId,
  });

  if (chaptersLoading) return <div>Loading...</div>;
  if (chaptersError) return <div>Error loading progress</div>;

  return (
    <div>
      <h1>Student Progress for {studentId}</h1>
      {chaptersProgress ? (
        <div>
          {chaptersProgress.map((progress, index) => (
            <div key={index}>
              <h2>Chapter {index + 1}: {progress.chapterId}</h2>
              <p>Progress: {progress.completed ? "Completed" : "Not Completed"}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No progress data available</div>
      )}
    </div>
  );
}

export default StudentDetails;
