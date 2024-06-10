import { useEffect } from "react";
import StudentList from "@/components/Classroom/StudentList";
import { useOutletContext } from "react-router-dom";

function Students() {
  const context = useOutletContext();

  if (!context) {
    return <div className="text-center text-gray-500 dark:text-gray-400">No classroom data available.</div>;
  }

  const { classroom, refetch, isFetching } = context;

  useEffect(() => {
    if (!isFetching) {
      refetch();
      console.log('refetch called');
    }
  }, [refetch]);

  return (
    <div>
      {isFetching ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Fetching data...</div>
      ) : (
        <div>
          <StudentList students={classroom.students} />
        </div>
      )}
    </div>
  );
}

export default Students;
