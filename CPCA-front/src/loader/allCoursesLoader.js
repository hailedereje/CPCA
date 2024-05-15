import { db } from "@/db/db";
import newRequests from "@/utils/newRequest";

const allCourse = {
      queryKey: ['allCourses'],
      queryFn:  () =>  newRequests.get("/all")
  }
  
  export const allCourseLoader = (queryClient) => async () => {
    const response = await queryClient.ensureQueryData(allCoursea);
    return { course: response };
  };