import { useGetChaptersProgressQuery } from "@/api";
import React from "react";
import { useOutlet, useOutletContext, useParams } from "react-router-dom";

function StudentDetails() {

    const {studentId} = useParams();
    const {classroom } = useOutletContext();;  
    console.log(studentId, classroom); // Output the studentId

    const { data: chaptersProgress, isLoading: chaptersLoading, error: chaptersError } = useGetChaptersProgressQuery({
        classroomId: classroom._id,
        courseId: classroom.courseId,
      });

      console.log("chaptersProgress", chaptersProgress);
    // Output the context object
    // classroom: {_id: '665a14e2e5dda17a7dcd55df', name: 'Javascript', description: 'javascript course for biginners', instructorId: '6655946ccc39e45588042e5b', courseId: '664f130f362c3bd03dbdcca7', …},
    // refetch: () => {…}


  return <div>Student Details</div>;
}

export default StudentDetails;
