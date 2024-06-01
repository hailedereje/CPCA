import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchChapters, fetchChapter, createChapter, updateChapter, deleteChapter,renameChapter,
    fetchLessons,
    createLesson,
    fetchLesson,
    addLessonItem,
    updateLessonItem,
    deleteLessonItem,
    deleteLesson,
    uploadImage,
    createQuiz,
    addDescription
  } from './actions';
import { showErrorToast, showSuccessToast } from '@/toasts/toast';
import toast from 'react-hot-toast';
  

export const useCourse = (courseId) => {
  return  useQuery({
    queryKey: ['course', courseId],
    queryFn: () => newRequests.get(`/courses/course`, {
      params: {
        id: courseId
      }
    }),
    staleTime: 1000 * 6 * 500,
    retry:3
  })
}

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

export const useUploadCourseImage = (courseId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['course',courseId]});
      toast.success("image uploaded successfully")
    },
    onError: () => {
      showErrorToast("failed to upload image")
    }
  })
}

export const useAddDescription = (courseId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addDescription,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['course',courseId]});
      showSuccessToast("description added successfully")
    },
    onError: () => {
      showErrorToast("failed to add description")
    }
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['course',courseId]})
      toast.success("chapter deleted successfully")
    },
    onError: () => {
      showErrorToast("failed to delete chapter")
    }
  })
}

export const useCreateQuiz = (courseId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['course',courseId]})
      showSuccessToast("quiz created successfully")
    },
    onError: () => {
      showErrorToast("failed to create quiz")
    }
  })
}

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
export const useLessons = (chapterId) => {
  return useQuery({
    queryKey: ['lessons', chapterId],
    queryFn: () => fetchLessons(chapterId),
    staleTime: 1000 * 6 * 300,
    retry: 3,
    refetchInterval: false
  });
};

export const useDeleteLesson = (courseId, lessonId,chapterId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLesson, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
      queryClient.removeQueries(['lesson', lessonId]);
      showSuccessToast("lesson deleted successfully")
    },
    onError: () => {
      showErrorToast("failed to delete lesson")
    }
  });
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

export const useDeleteLessonItem = (lessonId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteLessonItem,
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey: ['lesson',lessonId]})
      showSuccessToast("lessonItem deleted successfully")
    },
    onError: () => {
      showErrorToast("failed to delete lessonItem")
    }
  })
}