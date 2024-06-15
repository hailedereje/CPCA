import { useGetQuizStats } from '@/components/createCourse/hooks/statistics-hooks';
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = {
  studentPerformance: [
    { name: 'Quiz 1', averageScore: 75 },
    { name: 'Quiz 2', averageScore: 85 },
    { name: 'Quiz 3', averageScore: 78 },
    { name: 'Quiz 4', averageScore: 92 },
  ],
  courseEngagement: [
    { name: 'Course 1', engagement: 450 },
    { name: 'Course 2', engagement: 350 },
    { name: 'Course 3', engagement: 500 },
    { name: 'Course 4', engagement: 250 },
  ],
  instructorActivity: [
    { name: 'Instructor 1', activity: 15 },
    { name: 'Instructor 2', activity: 20 },
    { name: 'Instructor 3', activity: 10 },
  ],
  platformUsage: [
    { name: 'Students', usage: 1200 },
    { name: 'Instructors', usage: 150 },
  ],
};

const COLORS = ['#4A90E2', '#50E3C2', '#FFBB28', '#FF8042'];

const StatisticsPage = () => {
 
  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-4xl font-bold text-center  mb-10">Dashboard Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Student Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Student Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.studentPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="averageScore" stroke="#4A90E2" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Engagement Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Course Engagement</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.courseEngagement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="engagement" fill="#50E3C2" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Instructor Activity Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Instructor Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.instructorActivity}
                dataKey="activity"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#4A90E2"
              >
                {data.instructorActivity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Usage Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2 lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Platform Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.platformUsage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usage" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
