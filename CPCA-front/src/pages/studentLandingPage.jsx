import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import DefaultProfileImage from '@/assets/blank_profile.webp';
import CoursePlaceHolder from '@/assets/coursePlaceholder.jpg';
import { FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';

const StudentLandingPage = () => {
  const navigate = useNavigate();
  const student = useSelector((state) => state.userState.user);

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      <header className="bg-blue-400 text-white p-6 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={student?.profileImg || DefaultProfileImage}
              alt={student.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">Welcome, {student.name}</h1>
              <p>{student.email}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100"
          >
            <AiOutlineUser size={20} />
            <span>Profile</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-6 rounded-md flex flex-col justify-between gap-8">
      <section className="mb-8 shadow rounded-lg p-8 bg-white">
  <h2 className="text-5xl font-bold text-gray-600 mb-8 text-center">
    information regarding LMS and how to use it
  </h2>
  <p className="text-lg text-gray-700  mb-4 leading-loose">
    Our Learning Management System (LMS) is designed to provide students with an easy-to-use and engaging platform to enhance their learning experience.
  </p>
  <p className="text-lg text-gray-700 leading-relaxed">
    From accessing course materials to tracking your progress, our LMS offers a comprehensive set of tools to help you succeed in your studies.
  </p>
  <div className="mt-6 flex items-center justify-center">
    <div className="flex items-center justify-center w-20 h-20 bg-purple-400 rounded-full shadow-lg">
      <i className="fas fa-graduation-cap text-purple-600 text-4xl"></i>
    </div>
    <div className="ml-4">
      <h3 className="text-2xl font-semibold text-purple-700">Easy-to-Use</h3>
      <p className="text-lg text-gray-600 leading-relaxed">
        Our intuitive interface makes it simple to navigate and find what you need.
      </p>
    </div>
  </div>
  <div className="mt-6 flex items-center justify-center">
    <div className="flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full shadow-lg">
      <i className="fas fa-chart-line text-green-600 text-4xl"></i>
    </div>
    <div className="ml-4">
      <h3 className="text-2xl font-semibold text-green-700">Track Progress</h3>
      <p className="text-lg text-gray-600 leading-relaxed">
        Keep tabs on your on what u completed. such as quizes , lap practices and lessons
      </p>
    </div>
  </div>
  <div className="mt-6 flex items-center justify-center">
    <div className="flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-full shadow-lg">
      <i className="fas fa-book text-blue-600 text-4xl"></i>
    </div>
    <div className="ml-4">
      <h3 className="text-2xl font-semibold text-blue-700">Access Materials</h3>
      <p className="text-lg text-gray-600 leading-relaxed">
        Easily find and use all the course materials you need in one convenient place.
      </p>
    </div>
  </div>
</section>

        <section className="mb-8 bg-white p-4 shadow rounded">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="p-4 rounded-md">
            <div className="flex items-start gap-4 mb-4">
              <FaQuestionCircle size={24} className="text-blue-600" />
              <div className='w-2/3'>
                <h3 className="text-lg font-bold text-gray-800">How do I enroll in a course?</h3>
                <p className="text-gray-600 text-sm">You can enroll in a course after invited by classroom instructor. the instructor will send u access link and using that u will join the classroom then u can access the course</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4 w-2/3">
              <FaQuestionCircle size={24} className="text-blue-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">How do I access my quizes ?</h3>
                <p className="text-gray-600 text-sm">quizes can be accessed from the course page under the 'each' chapter as each chapter has dedicated quiz.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 w-2/3">
              <FaQuestionCircle size={24} className="text-blue-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Who do I contact for support?</h3>
                <p className="text-gray-600 text-sm">There is dedicated descussion forum for each classroom you can raise any questions</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get Started</h2>
          <p className="text-gray-600 mb-4">Ready to start learning? Explore our courses and get started today!</p>
          <button
            onClick={() => navigate('/dashboard/classrooms')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Browse Courses
          </button>
        </section>
      </main>
    </div>
  );
};

export default StudentLandingPage;
