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
    addDescription,
    createCourse,
    getCourse,
    createLab,
    updateLab,
    deleteLab,
    fetchLab,
    updateCourse,
    deleteCourse,
    getCourses,
    publishCourse,
    renameLesson
  } from './actions';

import { showErrorToast, showSuccessToast } from '@/toasts/toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
 
export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourses(),
    staleTime: 1000 * 6 * 100,
    retry:3,
    refetchInterval:false
  });
}

export const useCreateCourse = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      showSuccessToast("course created successfully")
      navigate(`/dashboard/course/update/${ data.data.id }`)
    },
    onError: () => {
      showErrorToast("failed to create course")
    }
  })
}

export const useUpdateCourse = (courseId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['course',courseId]})
      showSuccessToast("course updated successfully")
    },
    onError: () => {
      showErrorToast("failed to update course")
    }
  })
}

export const usePublishCourse = (courseId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: publishCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['course',courseId]})
      queryClient.invalidateQueries({queryKey:['draftCourses']})
      showSuccessToast("course published successfully")
    },
    onError: () => {
      showErrorToast("failed to publish course")
    }
  })
}


export const useCourse = (courseId) => {
  return  useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourse(courseId),
    staleTime: 1000 * 6 * 500,
    retry:3,
    refetchInterval:false
  })
}

export const useDeleteCourse = (courseId) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.removeQueries({queryKey:['course',courseId]})
      queryClient.invalidateQueries({queryKey:['draftCourses']})
      navigate('/dashboard/courses/draft')
      showSuccessToast("course deleted successfully")
    },
    onError: () => {
      showErrorToast("failed to delete course")
    }
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

export const useCreateLab = (courseId) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLab,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['course',courseId]});
      navigate(`/dashboard/course/update/${courseId}`)
      showSuccessToast("lab created successfully")
    },
    onError: () => {
      showErrorToast("failed to create lab")
    }
  })
}

export const useUpdateLab = (courseId,labId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLab,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['course',courseId]});
      queryClient.invalidateQueries({queryKey:['lab',labId]});
      showSuccessToast("lab updated successfully")
    },
    onError: () => {
      showErrorToast("failed to update lab")
    }
  })
}

export const useDeleteLab = (courseId,labId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLab,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['course',courseId]});
      queryClient.removeQueries({queryKey:['lab',labId]});
      // redirect("/course")
      showSuccessToast("lab deleted successfully")
    },
    onError: () => {
      showErrorToast("failed to delete lab")
    }
  })
}

export const useGetLab = (labId) => {
  return useQuery({
    queryKey: ['lab',labId],
    queryFn: () => fetchLab(labId),
    staleTime: 1000 * 6 * 300,
    retry:3,
    refetchInterval:false
  })
}

export const useCreateChapter = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChapter, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['course',courseId]});
      showSuccessToast("chapter created successfully")
    },
    onError: () => {
      showErrorToast("failed to create chapter")
    }
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

export const useDeleteChapter = (courseId,lessonIds) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['course',courseId]})
      lessonIds.map((lessonId) => queryClient.removeQueries(['lesson',lessonId]))
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

export const useRenameLesson = (courseId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: renameLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['course',courseId]})
    },
    onError: () => {
      showErrorToast("failed to rename lesson")
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