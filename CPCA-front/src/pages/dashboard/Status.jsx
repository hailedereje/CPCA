import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import newRequests from '@/utils/newRequest';

const StatisticsPage = () => {
  const [studentGrowth, setStudentGrowth] = useState([]);
  const [topClassrooms, setTopClassrooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentGrowthResponse = await newRequests.get('/user/student-growth/get')
        const topClassroomsResponse = await newRequests.get('/classroom/top-classrooms/find');
        
        setStudentGrowth(studentGrowthResponse.data);
        setTopClassrooms(topClassroomsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-4xl font-bold text-center mb-10">Dashboard Statistics</h1>
      
      <div className="flex flex-col gap-6">
        {/* Student Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Student Growth Per Hour</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={studentGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#4A90E2" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Classrooms Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Top 10 Classrooms</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topClassrooms}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="studentCount" fill="#50E3C2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
