import { FaCheckCircle } from 'react-icons/fa';

const LearningObjectives = () => {
    const objectives = [
    'Techniques with survey and evaluated ethical standards relevant to the practice of psychotherapy and related fields.',
    'Participants will survey and understand legal practices and concerns relevant to providing treatment or assistance.',
    'Participants will survey and understand the necessity of utilizing treatment approaches which are evidence-based, theoretically sound, and meet the standard of practice.',
    ]

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Learning Objectives</h2>
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <ul className="space-y-2">
            {objectives.map((objective, index) => (
                <li key={index} className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span>{objective}</span>
                </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg overflow-hidden">
        <img src="https://via.placeholder.com/300" alt="Learning Objectives" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default LearningObjectives;
