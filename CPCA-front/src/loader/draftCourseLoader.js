import { db } from "@/db/db";
import newRequests from "@/utils/newRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const fetchDraftCourse = async (id) => {
  return db.table('courses').get(id);
};

export const useDraftCourse = (id) => {
  return useQuery(['draftCourse', id], () => fetchDraftCourse(id), {
    staleTime: 60000, // 1 minute
    cacheTime: 300000, // 5 minutes
  });
};


export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation(() => newRequests.post("/courses/add-prerequisites",data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['course',data.id]);
    },
    onError: (error, variables, context) => {
      // Handle error
      console.error('Error updating course:', error);
    },
    onSettled: () => {
      // Optional: refetch or perform other actions
    },
  });
};