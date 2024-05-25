/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentProgress } from './slices/progressSlice';
import ChapterProgress from '@/components/progress/ChapterProgress';
import { Loading } from '@/components';

const ProgressPage = ({ courseId, studentId }) => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.progress.course);
  const status = useSelector((state) => state.progress.status);
  const error = useSelector((state) => state.progress.error);

  useEffect(() => {
    dispatch(fetchStudentProgress({ courseId, studentId }));
  }, [dispatch, courseId, studentId]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <div className="mb-4">
        <strong>Total Progress: {course.progress}%</strong>
        <progress className="progress w-full" value={course.progress} max="100"></progress>
      </div>
      {course.chapters?.map((chapter) => (
        <ChapterProgress key={chapter._id} chapter={chapter} />
      ))}
    </div>
  );
};

export default ProgressPage;
