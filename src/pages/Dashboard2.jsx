import React, { useState } from 'react';
import PageHeader2 from '../components/PageHeader2';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import dashboardData from '../dashboardData.json';

const Dashboard2 = () => {
  const { totalStudents, newUsers, studentActivity, studentsList } = dashboardData;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = studentsList.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 overflow-y-auto flex-grow">
      <PageHeader2 title="Students" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Total Students Card */}
        <div className="relative bg-teal-100 rounded-xl shadow-md p-6 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-teal-500 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354l-2.169 4.357-4.831.664 3.597 3.54-1.265 4.785 4.165-2.119 4.165 2.119-1.265-4.785 3.597-3.54-4.831-.664-2.169-4.357z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-teal-700">{totalStudents.value}</h3>
            <p className="text-sm text-teal-500">{totalStudents.label}</p>
          </div>
          <div className="flex items-center text-green-500 text-sm font-semibold ml-auto">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>{totalStudents.growth}</span>
          </div>
          <div className="absolute bottom-2 right-2 w-24 h-12">
            <ResponsiveContainer width="100%" height={48}>
              <LineChart data={totalStudents.chartData}>
                <Line type="monotone" dataKey="value" stroke="#38b2ac" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New Users Card */}
        <div className="relative bg-blue-100 rounded-xl shadow-md p-6 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-blue-500 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-700">{newUsers.value}</h3>
            <p className="text-sm text-blue-500">{newUsers.label}</p>
          </div>
          <div className="flex items-center text-green-500 text-sm font-semibold ml-auto">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>{newUsers.growth}</span>
          </div>
          <div className="absolute bottom-2 right-2 w-24 h-12">
            <ResponsiveContainer width="100%" height={48}>
              <LineChart data={newUsers.chartData}>
                <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Students Activity Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Students Activity</h2>
            <div className="flex items-center text-gray-500 text-sm">
              <span className="mr-3">Last Week</span>
              <span className="mr-3">This Week</span>
              <span>This Month</span>
            </div>
          </div>
          <div className="h-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studentActivity.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={false} />
                <YAxis tick={false} />
                <Tooltip />
                <Line type="monotone" dataKey="lastWeek" stroke="#cbd5e0" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="thisWeek" stroke="#a78bfa" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="font-bold text-xl text-indigo-600">{studentActivity.currentValue}</span>
              <p className="text-gray-500 text-sm">{studentActivity.currentLabel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Students List</h2>
          <div className="relative">
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student ID</th>
                <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Courses</th>
                <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Join Date</th>
                <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-5 py-5 border-b bg-white text-sm">
                    <div className="flex items-center">
                      <img className="w-8 h-8 rounded-full mr-2" src={student.avatar} alt={student.name} />
                      <p className="text-gray-900 truncate">{student.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b bg-white text-sm">{student.studentId}</td>
                  <td className="px-5 py-5 border-b bg-white text-sm">{student.courses}</td>
                  <td className="px-5 py-5 border-b bg-white text-sm">{student.joinDate}</td>
                  <td className="px-5 py-5 border-b bg-white text-sm">
                    <span className={`relative inline-block px-3 py-1 font-semibold text-xs rounded-full ${
                      student.status === 'Completed' ? 'bg-green-100 text-green-600' :
                      student.status === 'On Progress' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      <span className="absolute left-0 top-0 rounded-full w-2 h-2 -ml-1" style={{ backgroundColor:
                        student.status === 'Completed' ? '#48bb78' :
                        student.status === 'On Progress' ? '#f6ad55' :
                        '#e53e3e'
                      }}></span>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b bg-white text-sm">
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 bg-white border-t text-xs text-gray-500">
          Showing {filteredStudents.length} result(s)
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;
