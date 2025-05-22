import React, { useState } from "react";
import studentData from "./students.json";

export default function AdminStudentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedAge, setSelectedAge] = useState("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (name === "searchTerm") {
      setSearchTerm(value);
    } else if (name === "selectedClass") {
      setSelectedClass(value);
    } else if (name === "selectedAge") {
      setSelectedAge(value);
    }
  };

  const filteredStudents = studentData.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass ? student.class.includes(selectedClass) : true;
    const matchesAge = selectedAge ? student.age === parseInt(selectedAge) : true;
    return matchesSearch && matchesClass && matchesAge;
  });

  const allClasses = [...new Set(studentData.map((student) => student.class))];
  const allAges = [...new Set(studentData.map((student) => student.age))];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Grid Layout: Sidebar + Main */}
      <div className="grid grid-cols-1 md:grid-cols-5">
        
        {/* Sidebar (Placeholder for now) */}
        <aside className="bg-white shadow-md md:col-span-1 p-6 hidden md:block">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Admin Panel</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer">📋 Student List</li>
            <li className="hover:text-blue-600 cursor-pointer">👩‍🏫 Teacher</li>
            <li className="hover:text-blue-600 cursor-pointer">📆 Schedule</li>
            <li className="hover:text-blue-600 cursor-pointer">⚙️ Settings</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="p-6 md:p-10 md:col-span-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Student List</h1>

          {/* Filter Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="searchTerm"
              placeholder="🔍 Search by name"
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={handleChange}
            />

            <select
              name="selectedClass"
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedClass}
              onChange={handleChange}
            >
              <option value="">📚 All Classes</option>
              {allClasses.map((classItem, index) => (
                <option key={index} value={classItem}>
                  {classItem}
                </option>
              ))}
            </select>

            <select
              name="selectedAge"
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedAge}
              onChange={handleChange}
            >
              <option value="">🎂 All Ages</option>
              {allAges.map((age, index) => (
                <option key={index} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>

          {/* Add Student Button */}
          <div className="mb-4 flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md transition">
              ➕ Add Student
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Age</th>
                  <th className="px-6 py-4">Class</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4">Parent</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Photo</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-blue-50 transition">
                    <td className="px-6 py-4">{student.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4">{student.age}</td>
                    <td className="px-6 py-4">{student.class}</td>
                    <td className="px-6 py-4">{student.details.address}</td>
                    <td className="px-6 py-4">{student.details.parent.name}</td>
                    <td className="px-6 py-4">{student.details.parent.contact}</td>
                    <td className="px-6 py-4">
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="h-12 w-12 rounded-full object-cover border"
                      />
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold">✏️ Edit</button>
                      <button className="text-red-600 hover:text-red-800 font-semibold">🗑️ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredStudents.length === 0 && (
              <div className="text-center text-gray-500 py-6">No students found.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
