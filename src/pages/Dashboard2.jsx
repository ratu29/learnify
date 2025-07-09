// Dashboard2.js
import React, { useState } from "react";
import axios from "axios";
import studentsData from "../data/students_dataset.json";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import PageHeader2 from "../components/PageHeader2";

const Dashboard2 = () => {
  const [formData, setFormData] = useState({
    school: "",
    major: "",
    grade: "",
    gender: "",
  });
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [schoolSummary, setSchoolSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredStatusData, setFilteredStatusData] = useState([]);
  const [filteredStudentsFromForm, setFilteredStudentsFromForm] = useState([]);

  const studentsPerPage = 10;
  const filteredStudents = (
    filteredStudentsFromForm.length > 0
      ? filteredStudentsFromForm
      : studentsData
  ).filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const handleNext = () => {
    if (indexOfLastStudent < filteredStudents.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const totalSiswa = studentsData.length;
  const totalMale = studentsData.filter((s) => s.gender === "Male").length;
  const totalFemale = studentsData.filter((s) => s.gender === "Female").length;

  const COLORS = ["#f87171", "#facc15", "#4ade80", "#38bdf8", "#a78bfa"];
  const cardData = [
    { name: "Jumlah Siswa", value: totalSiswa, icon: "👥", color: COLORS[0] },
    { name: "Siswa Laki-laki", value: totalMale, icon: "👦", color: COLORS[1] },
    {
      name: "Siswa Perempuan",
      value: totalFemale,
      icon: "👧",
      color: COLORS[2],
    },
  ];

  const statusData = Object.entries(
    studentsData.reduce((acc, cur) => {
      acc[cur.status] = (acc[cur.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const statusPerMajor = Object.entries(
    studentsData.reduce((acc, cur) => {
      acc[cur.major] = (acc[cur.major] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const statusPerGrade = Object.entries(
    studentsData.reduce((acc, cur) => {
      acc[cur.grade] = (acc[cur.grade] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const genderData = Object.entries(
    studentsData.reduce((acc, cur) => {
      acc[cur.gender] = (acc[cur.gender] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post(
        "https://6cbecaba7313.ngrok-free.app/predict",
        formData
      );
      const status = res.data.predicted_status;
      setResult(status);
      setExplanation(getExplanation(status, formData));
      setSchoolSummary(getSchoolSummary(formData.school));

      const matchedStudents = studentsData.filter((s) => {
        const matchSchool = !formData.school || s.school === formData.school;
        const matchMajor = !formData.major || s.major === formData.major;
        const matchGrade = !formData.grade || s.grade === formData.grade;
        const matchGender =
          formData.gender === "Female and Male" ||
          !formData.gender ||
          s.gender === formData.gender;
        return matchSchool && matchMajor && matchGrade && matchGender;
      });

      if (matchedStudents.length === 0) {
        alert("⚠️ Tidak ada siswa yang cocok dengan kombinasi input tersebut.");
      }

      setFilteredStudentsFromForm(matchedStudents);
      setCurrentPage(1);

      const statusCount = matchedStudents.reduce((acc, cur) => {
        acc[cur.status] = (acc[cur.status] || 0) + 1;
        return acc;
      }, {});
      const chartData = ["Completed", "On Progress", "No Progress"].map(
        (status) => ({
          name: status,
          value: statusCount[status] || 0,
        })
      );
      setFilteredStatusData(chartData);
    } catch (err) {
      alert("❌ Gagal melakukan prediksi. Periksa koneksi atau format input.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getExplanation = (status, data) => {
    const genderText =
      data.gender === "Female and Male"
        ? "para siswa dan siswi"
        : data.gender === "Female"
        ? "siswi"
        : "siswa";

    const schoolText = `Berdasarkan data dari ${genderText} di ${data.school}, jurusan ${data.major}, kelas ${data.grade}, berikut adalah hasil prediksi status pembelajarannya:\n\n`;

    let detail = "";
    switch (status) {
      case "No Progress":
        detail =
          "📌 Siswa belum menunjukkan aktivitas belajar yang tercatat dalam sistem. Hal ini bisa berarti siswa belum pernah login, belum memulai modul pertama, atau masih menunggu bimbingan dari guru.";
        break;
      case "On Progress":
        detail =
          "⏳ Siswa sedang aktif dalam proses belajar. Beberapa modul telah diselesaikan, namun masih terdapat materi yang belum dituntaskan. Disarankan untuk terus memberikan motivasi dan pemantauan agar siswa tetap konsisten.";
        break;
      case "Completed":
        detail =
          "✅ Siswa telah berhasil menyelesaikan seluruh rangkaian modul belajar dan evaluasi yang tersedia. Ini menandakan tingkat kemandirian dan partisipasi belajar yang sangat baik.";
        break;
      default:
        detail = "Status tidak dikenali.";
    }

    return `${schoolText}${detail}\n\n📊 Prediksi ini berdasarkan analisis terhadap pola login, penyelesaian modul, serta partisipasi siswa dalam kegiatan belajar digital.`;
  };

  const getSchoolSummary = (school) => {
    if (school.includes("Yogyakarta"))
      return 'Sekolah ini menunjukkan tingkat keaktifan tinggi dengan dominasi status "On Progress".';
    if (school.includes("Semarang"))
      return 'Sebagian besar siswa di Semarang berada dalam status "Completed", namun ada juga yang belum memulai.';
    return "Aktivitas siswa dari sekolah ini bervariasi, disarankan untuk memotivasi mereka agar menyelesaikan pembelajaran.";
  };

  return (
    <div className="p-6 overflow-y-auto max-w-6xl mx-auto">
      <PageHeader2 title="📊 Dashboard Prediksi - Learning Center GO" />
      {/* CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {cardData.map((stat, i) => (
          <div
            key={i}
            className="relative bg-opacity-50 rounded-xl shadow-md p-6"
            style={{ backgroundColor: stat.color + "33" }}
          >
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: stat.color, color: "white" }}
            >
              {stat.icon}
            </div>
            <h3 className="text-xl font-bold mt-2">{stat.value}</h3>
            <p className="text-gray-600">{stat.name}</p>
            <div className="absolute bottom-2 right-2 w-24 h-12">
              <ResponsiveContainer width="100%" height={48}>
                <LineChart data={[{ value: 0 }, { value: stat.value }]}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={stat.color}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-bold mb-4">📊 Distribusi Status</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {statusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-bold mb-4">📈 Bar Status Siswa</h2>
          <BarChart width={400} height={300} data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#60a5fa" />
          </BarChart>
        </div>
      </div>

      {/* CHART MAJOR DAN GRADE */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-bold mb-4">
            📚 Jumlah Siswa per Jurusan
          </h2>
          <BarChart width={400} height={300} data={statusPerMajor}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4ade80" />
          </BarChart>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-bold mb-4">
            📘 Jumlah Siswa per Tingkat
          </h2>
          <BarChart width={400} height={300} data={statusPerGrade}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#fbbf24" />
          </BarChart>
        </div>
      </div>

      {/* GENDER */}
      <div className="bg-white rounded-lg p-6 shadow mb-12">
        <h2 className="text-lg font-bold mb-4">🚻 Distribusi Gender</h2>
        <BarChart width={600} height={300} data={genderData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#818cf8" />
        </BarChart>
      </div>

      {/* FORM */}
      <form
        className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow mb-12"
        onSubmit={handleSubmit}
      >
        {/* Form fields */}
        <div>
          <label className="block font-medium mb-1">🏫 Asal Sekolah</label>
          <select
            name="school"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Pilih Sekolah --</option>
            <option>SMK Negeri 1 Bandung</option>
            <option>SMK Negeri 2 Jakarta</option>
            <option>SMK Negeri 3 Surabaya</option>
            <option>SMK Negeri 4 Yogyakarta</option>
            <option>SMK Negeri 5 Semarang</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">🎓 Jurusan</label>
          <select
            name="major"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Pilih Jurusan --</option>
            <option>Akuntansi</option>
            <option>Multimedia</option>
            <option>Rekayasa Perangkat Lunak</option>
            <option>Teknik Elektronika</option>
            <option>Teknik Komputer Jaringan</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">📚 Tingkat</label>
          <select
            name="grade"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Pilih Tingkat --</option>
            <option>X</option>
            <option>XI</option>
            <option>XII</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">🚻 Jenis Siswa</label>
          <select
            name="gender"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Pilih Gender --</option>
            <option>Female</option>
            <option>Male</option>
            <option>Female and Male</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold transition ${
              loading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            {loading ? "⏳ Memproses..." : "🔍 Prediksi Status"}
          </button>
        </div>
      </form>
      {/* HASIL */}
      {result && (
        <div
          className={`mt-8 p-6 rounded shadow ${
            result === "Completed"
              ? "bg-green-100 text-green-900 border border-green-300"
              : result === "On Progress"
              ? "bg-yellow-100 text-yellow-900 border border-yellow-300"
              : "bg-red-100 text-red-900 border border-red-300"
          }`}
        >
          <h3 className="text-xl font-semibold mb-2">
            📈 Hasil Prediksi: <span className="underline">{result}</span>
          </h3>
          <p className="whitespace-pre-line mb-3">{explanation}</p>
          <p className="italic">{schoolSummary}</p>
        </div>
      )}

      {filteredStatusData.length > 0 && (
        <div className="mt-8 bg-white rounded-lg p-6 shadow w-full max-w-lg mx-auto">
          <h4 className="text-lg font-semibold mb-4 text-center">
            📊 Distribusi Status Siswa Sesuai Inputan
          </h4>
          <PieChart width={400} height={300}>
            <Pie
              data={filteredStatusData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {filteredStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.name === "Completed"
                      ? "#4ade80"
                      : entry.name === "No Progress"
                      ? "#f87171"
                      : entry.name === "On Progress"
                      ? "#facc15"
                      : "#a78bfa"
                  }
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}

      {/* TABEL */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            📋 Students List
          </h2>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="🔍 Cari nama siswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {[
                  "Name",
                  "NIS",
                  "School",
                  "Major",
                  "Grade",
                  "Gender",
                  "Status",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-5 py-4 text-sm text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {student.nis}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {student.school}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {student.major}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {student.grade}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {student.gender}
                  </td>
                  <td className="px-5 py-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : student.status === "On Progress"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <span>
            Halaman {currentPage} dari{" "}
            {Math.ceil(filteredStudents.length / studentsPerPage)}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            onClick={handleNext}
            disabled={indexOfLastStudent >= filteredStudents.length}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;
