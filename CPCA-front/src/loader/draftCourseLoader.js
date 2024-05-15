import { db } from "@/db/db";

const draftCourseQuery = (id)  => {
    return {
      queryKey: ['draftCourse',id],
      queryFn:  () =>  db.table('courses').get(id)
  }
  }
  export const draftCourseLoader = (queryClient) => async ({params}) => {
    const response = await queryClient.ensureQueryData(draftCourseQuery(params.id));
    return { course: response };
  };