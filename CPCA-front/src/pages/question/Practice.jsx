import { useParams } from 'react-router-dom';
import newRequests from '@/utils/newRequest';
import { Loading } from '@/components';
import { useQuery } from 'react-query';
import { CodeEditor } from '@/components/CodeEditor';

const PracticeQuestionPage = () => {
  const { id } = useParams();

  const {isLoading, data} = useQuery('practice_questions', async () => {
    try {
        await newRequests.get( `/practice_questions/${id}`);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
      <p className="mb-4">{data.description}</p>
      <div className="mb-4">
        <strong>Difficulty:</strong> {data.difficulty}
      </div>
      <div className="mb-4">
        <strong>Tags:</strong> {data.tags.join(', ')}
      </div>
      <CodeEditor />
    </div>
  );
};

export default PracticeQuestionPage;
