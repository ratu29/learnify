import React from "react";
import scheduleData from "../scheduleData.json";
import PageHeader2 from "../components/PageHeader2";

const Schedule = () => {
  const ongoingClasses = scheduleData.filter((item) => item.type === "ongoing");
  const todaySchedule = scheduleData.filter((item) => item.type === "today");
  const upcomingSchedule = scheduleData.filter(
    (item) => item.type === "upcoming"
  );

  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {" "}
      {/* Background lebih terang */}
      {/* Sidebar */}
     
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
      

        {/* Page Header */}
        <div className="p-6 w-full">
          {" "}
          {/* Padding lebih besar */}
          <PageHeader2 title="My Schedule" /> {/* Asumsi judul tetap */}
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto flex-grow w-full">
          {" "}
          {/* Padding lebih besar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-auto gap-6 w-full">
            {" "}
            {/* Gunakan lg:grid-cols-auto dan tambahkan md */}
            {/* Ongoing Class */}
            <div className="bg-white rounded-xl shadow-md p-6">
              {" "}
              {/* Rounded corners lebih besar */}
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Ongoing Class
              </h2>
              <div className="space-y-5">
                {" "}
                {/* Spasi antar item lebih besar */}
                {ongoingClasses.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    {" "}
                    {/* Align horizontal */}
                    <div className="w-14 h-14 mr-4 relative">
                      <div
                        className="rounded-full flex items-center justify-center font-bold text-md text-blue-600"
                        style={{
                          background: `conic-gradient(#007bff ${item.progress}%, #e0f2f7 ${item.progress}%)`,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span>{item.progress}%</span>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      {" "}
                      {/* Judul dan progress bar */}
                      <h3 className="text-md font-medium text-gray-700">
                        {item.title}
                      </h3>
                      <div className="bg-gray-200 rounded-full h-2 w-24 overflow-hidden">
                        {" "}
                        {/* Lebar progress bar */}
                        <div
                          className="bg-blue-500 h-full rounded-full"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Calendar */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Calendar
              </h2>
              <div className="border rounded-md p-4 text-center text-gray-600">
                <div className="flex justify-between items-center mb-3">
                  <button className="text-gray-500 hover:text-gray-700">
                    &lt;
                  </button>
                  <span className="font-semibold text-gray-800">
                    January 2025
                  </span>
                  <button className="text-gray-500 hover:text-gray-700">
                    &gt;
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  <span className="text-gray-500">S</span>
                  <span className="text-gray-500">M</span>
                  <span className="text-gray-500">T</span>
                  <span className="text-gray-500">W</span>
                  <span className="text-gray-500">T</span>
                  <span className="text-gray-500">F</span>
                  <span className="text-gray-500">S</span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span className="bg-blue-100 text-blue-500 font-semibold rounded-full">
                    4
                  </span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                  <span>10</span>
                  <span>11</span>
                  <span>12</span>
                  <span>13</span>
                  <span>14</span>
                  <span>15</span>
                  <span className="bg-blue-500 text-white font-semibold rounded-full">
                    16
                  </span>
                  <span>17</span>
                  <span>18</span>
                  <span>19</span>
                  <span>20</span>
                  <span>21</span>
                  <span>22</span>
                  <span>23</span>
                  <span>24</span>
                  <span>25</span>
                  <span>26</span>
                  <span>27</span>
                  <span>28</span>
                  <span>29</span>
                  <span>30</span>
                  <span>31</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                </div>
              </div>
              <div className="mt-5 text-center">
                <div className="relative w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-sm">
                  <span>+15%</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Your Progress This Month
                </p>
                <ul className="flex justify-around text-xs text-gray-700 mt-3">
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>{" "}
                    Design
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>{" "}
                    Soft Skill
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>{" "}
                    Developer
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1"></span>{" "}
                    Science
                  </li>
                </ul>
              </div>
            </div>
            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-md p-6 col-span-1 md:col-span-2 lg:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Today's Schedule
                </h2>
              </div>
              {todaySchedule.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left">Waktu</th>
                        <th className="px-4 py-2 text-left">Judul</th>
                        <th className="px-4 py-2 text-left">Instruktur</th>
                        <th className="px-4 py-2 text-left">Peserta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {todaySchedule.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 font-medium text-gray-800">
                            {item.time}
                          </td>
                          <td className="px-4 py-2 text-blue-600">
                            {item.title}
                          </td>
                          <td className="px-4 py-2">{item.instructor}</td>
                          <td className="px-4 py-2">
                            {item.participants > 0 ? item.participants : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic mt-2">
                  No classes scheduled for today.
                </p>
              )}
            </div>
            {/* Upcoming Schedule */}
            <div className="bg-white rounded-xl shadow-md p-6 col-span-1 md:col-span-2 lg:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Upcoming Schedule
                </h2>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  View all
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Judul</th>
                      <th className="px-4 py-2 text-left">Instruktur</th>
                      <th className="px-4 py-2 text-left">Tanggal</th>
                      <th className="px-4 py-2 text-left">Waktu</th>
                      <th className="px-4 py-2 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {upcomingSchedule.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-700">
                          {item.title}
                        </td>
                        <td className="px-4 py-2">{item.instructor}</td>
                        <td className="px-4 py-2">{item.date}</td>
                        <td className="px-4 py-2">{item.time}</td>
                        <td className="px-4 py-2">
                          <button className="bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600 text-xs">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
