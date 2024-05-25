import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchChapters, fetchChapter, createChapter, updateChapter, deleteChapter,renameChapter,
    fetchLessons,
    createLesson,
    fetchLesson,
    addLessonItem,
    updateLessonItem
  } from './actions';
import { showErrorToast, showSuccessToast } from '@/toasts/toast';
  



export const useChapters = (courseId) => {
  return useQuery({
    queryKey:['chapters', courseId],
    queryFn: () => fetchChapters(courseId),
    staleTime: 1000 * 6 * 300,
    retry:3,
    refetchInterval:false
});
};

export const useChapter = (courseId, chapterId) => {
  return useQuery(['chapter', courseId, chapterId], () => fetchChapter(courseId, chapterId));
};

export const useCreateChapter = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChapter, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['course',courseId]});
    },
  });
};

export const useRenameChapter = (courseId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: renameChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['course',courseId]});
    },
  })
}

export const useUpdateChapter = (courseId, chapterId) => {
  const queryClient = useQueryClient();
  return useMutation((data) => updateChapter(courseId, chapterId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['chapter', courseId, chapterId]});
      queryClient.invalidateQueries({queryKey: ['chapters', courseId]});
    },
  });
};

export const useDeleteChapter = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation((chapterId) => deleteChapter(courseId, chapterId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['chapters', courseId]);
    },
  });
};

export const useCreateLesson = (chapterId,courseId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      // queryClient.invalidateQueries({queryKey: ['lessons',chapterId]})
      queryClient.invalidateQueries({queryKey: ['course',courseId]})
    }
  })
}

export const useLesson = (lessonId) => {
  return useQuery({
    queryKey: ['lesson',lessonId],
    queryFn: () => fetchLesson(lessonId),
    staleTime: 1000 * 6 * 200,
    retry:3,
    refetchInterval:false
  })
}

export const useAddLessonItem = (lessonId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addLessonItem,
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey: ['lesson',lessonId]})
      showSuccessToast("lessonItem created successfully")
    }
  })
}

export const useUpdateLessonItem = (lessonId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateLessonItem,
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey: ['lesson',lessonId]})
      showSuccessToast("lessonItem updated successfully")
    },
    onError: () => {
      showErrorToast("failed to update lessonItem")
    }
  })
}