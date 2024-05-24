/* eslint-disable react/prop-types */
const ChapterProgress = ({ chapter }) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold">{chapter.title}</h2>
      <div className="mb-2">
        <strong>Chapter Progress: {chapter.progress}%</strong>
        <progress className="progress w-full" value={chapter.progress} max="100"></progress>
      </div>
      {chapter.lessons.map((lesson) => (
        <div key={lesson._id} className="mb-2">
          <span>{lesson.title}</span>
          <input type="checkbox" checked={lesson.completed} readOnly />
        </div>
      ))}
      {chapter.quizzes.map((quiz) => (
        <div key={quiz._id} className="mb-2">
          <span>{quiz.title} - Attempted: {quiz.completed ? 'Yes' : 'No'}</span>
        </div>
      ))}
      {chapter.practiceQuestions.map((question) => (
        <div key={question._id} className="mb-2">
          <span>{question.title} - Attempted: {question.completed ? 'Yes' : 'No'}</span>
        </div>
      ))}
    </div>
  );
};

export default ChapterProgress;
