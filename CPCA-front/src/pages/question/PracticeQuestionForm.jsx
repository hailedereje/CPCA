/* eslint-disable react/prop-types */
import { useState } from 'react';
import newRequests from '@/utils/newRequest';
import { AiOutlinePlus } from 'react-icons/ai';
import add from '@/assets/add.gif';

const AddQuestionForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [tags, setTags] = useState('');
  const [constraints, setConstraints] = useState('');
  const [examples, setExamples] = useState('');
  const [sampleInput, setSampleInput] = useState('');
  const [sampleOutput, setSampleOutput] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleAdd = () => {}
  const handleCancel = (e) => {
    e.preventDefault();
    setPopupOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      title,
      description,
      difficulty,
      tags: tags.split(','),
      sampleInput,
      sampleOutput,
    };

    try {
      const response = await newRequests.post('/practice_question', newQuestion);
      console.log(response.data)
      setTitle('');
      setDescription('');
      setDifficulty('easy');
      setTags('');
      setSampleInput('');
      setSampleOutput('');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div className='relative'>
      <button
        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setPopupOpen(!isPopupOpen)}
      >
        <AiOutlinePlus className="h-6 w-6 mr-2" />
        Practice Questions
      </button>
      {isPopupOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="flex flex-col justify-center text-slate-50 p-10">
                <div className="flex items-center text-yellow-500 w-96 font-bold font-serif mb-2 ml-12">
                  <h1 className="text-2xl ">ADD QUESTIONS </h1>
                  <img
                    src={add}
                    alt="add icon"
                    className="w-1/3 h-20 -mt-6"
                  />
                </div>
                <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="4"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Difficulty</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                      value={constraints}
                      onChange={(e) => setConstraints(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="4"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Sample Input</label>
                    <textarea
                      value={sampleInput}
                      onChange={(e) => setSampleInput(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Sample Output</label>
                    <textarea
                      value={sampleOutput}
                      onChange={(e) => setSampleOutput(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                      value={examples}
                      onChange={(e) => setExamples(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="4"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={handleCancel}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                    >
                      Cancel
                    </button>
                    <div className="">
                      <button
                        onClick={handleAdd}
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                      >
                        Add
                      </button>
                      <button
                        onClick={handleSubmit}
                        className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded  ml-4 "
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddQuestionForm;
