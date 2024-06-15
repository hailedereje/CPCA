import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DefaultProfileImage from '@/assets/blank_profile.webp';
import { FaChalkboardTeacher, FaUsers, FaComments } from 'react-icons/fa';

const InstructorLandingPage = () => {
  const navigate = useNavigate();
  const instructor = useSelector((state) => state.userState.user);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-400 text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={instructor?.profileImg || DefaultProfileImage}
              alt={instructor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">Welcome, {instructor.name}</h1>
              <p>{instructor.email}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100"
          >
            <FaChalkboardTeacher size={20} />
            <span>Profile</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-6 rounded-md flex flex-col justify-between gap-8">
        <section className="mb-8 shadow rounded-lg p-8 bg-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Empower Your Teaching Experience</h2>
          <p className="text-lg text-gray-700 mb-4 leading-loose text-center">
            Take control of your classrooms and engage with your students like never before.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center flex-col">
              <div className="w-20 h-20 bg-[#2C5F2D] rounded-full flex items-center justify-center">
                <FaChalkboardTeacher className="text-white text-4xl" />
              </div>
              <h3 className="text-2xl font-semibold text-purple-700 mt-4 mb-2">Create Classrooms</h3>
              <p className="text-lg text-gray-600 text-center">
                Easily set up classrooms based on assigned courses and manage student interactions.
              </p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
                <FaUsers className="text-black text-4xl" />
              </div>
              <h3 className="text-2xl font-semibold text-green-700 mt-4 mb-2">Invite Students</h3>
              <p className="text-lg text-gray-600 text-center">
                Send invitations to students to join your classrooms and collaborate effectively.
              </p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                <FaComments className="text-white text-4xl" />
              </div>
              <h3 className="text-2xl font-semibold text-blue-700 mt-4 mb-2">Facilitate Discussions</h3>
              <p className="text-lg text-gray-600 text-center">
                Foster interactive learning environments through discussion forums within each classroom.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 bg-white p-4 shadow rounded">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Support and Assistance</h2>
          <div className="p-4 rounded-md">
            <div className="flex items-start gap-4 mb-4">
              <FaChalkboardTeacher size={24} className="text-purple-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Creating Classrooms</h3>
                <p className="text-gray-600 text-sm">
                  Learn how to effectively set up and manage your classrooms for optimal student engagement.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <FaUsers size={24} className="text-green-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Inviting Students</h3>
                <p className="text-gray-600 text-sm">
                  Step-by-step guide on inviting students to join your classrooms and collaborate on course materials.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaComments size={24} className="text-blue-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Engaging Discussions</h3>
                <p className="text-gray-600 text-sm">
                  Utilize discussion forums effectively to encourage active participation and knowledge sharing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get Started Today</h2>
          <p className="text-gray-600 mb-4">
            Ready to elevate your teaching experience? Start creating engaging classrooms and empowering your students
            today!
          </p>
          <button
            onClick={() => navigate('/dashboard/classrooms')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Explore Classrooms
          </button>
        </section>
      </main>
    </div>
  );
};

export default InstructorLandingPage;
