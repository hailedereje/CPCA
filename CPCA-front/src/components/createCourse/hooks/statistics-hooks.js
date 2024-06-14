import { useQuery } from "@tanstack/react-query";
import { getQuizStats } from "./actions";

export const useGetQuizStats = () => {
  
    return useQuery({
        queryKey: ['quizStats'],
        queryFn: () => getQuizStats(),
        staleTime: 1000 * 60 * 60,
        retry: 3,
        refetchInterval: false
    })
}