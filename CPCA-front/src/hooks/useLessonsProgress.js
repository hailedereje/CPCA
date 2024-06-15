import { useState, useEffect } from "react";
import { api } from "@/api";  // Import api instead of the hook

const useLessonsProgress = (classroomId, studentId, chapterIds) => {
  const [lessonsProgress, setLessonsProgress] = useState({});

  useEffect(() => {
    const fetchProgress = async () => {
      const progressPromises = chapterIds.map((chapterId) => 
        api.endpoints.getStudentLessonsProgress.initiate({ classroomId, studentId, chapterId }).unwrap()
          .then((data) => ({ chapterId, data }))
          .catch((error) => {
            console.error(`Failed to fetch lessons progress for chapter ${chapterId}`, error);
            return { chapterId, data: null };
          })
      );

      const results = await Promise.all(progressPromises);
      const progressData = results.reduce((acc, { chapterId, data }) => {
        if (data) {
          acc[chapterId] = data;
        }
        return acc;
      }, {});

      setLessonsProgress(progressData);
    };

    fetchProgress();
  }, [classroomId, studentId, chapterIds]);

  return lessonsProgress;
};

export default useLessonsProgress;
