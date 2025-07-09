import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader2 from "../components/PageHeader2";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/students";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

export default function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL, { headers });
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  const filteredStudents = students.filter((s) =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    if (!status) return "bg-red-500 text-white";
    const normalized = status.trim().toLowerCase();

    if (normalized === "complated" || normalized === "completed") {
      return "bg-green-500 text-white";
    } else if (normalized === "on progres") {
      return "bg-yellow-400 text-black";
    } else if (normalized === "no progres") {
      return "bg-red-500 text-white";
    } else {
      return "bg-red-500 text-white"; // Default
    }
  };

const getPackageColor = (type) => {
  if (!type) return "bg-gray-300 text-black";
  const normalized = type.trim().toLowerCase();

  switch (normalized) {
    case "paket reguler":
      return "bg-green-500 text-white";   // Hijau
    case "paket intensif":
      return "bg-yellow-400 text-black";  // Kuning
    case "paket premium":
      return "bg-purple-600 text-white";  // Ungu
    default:
      return "bg-gray-400 text-white";
  }
};


  return (
    <div className="min-h-screen p-4 bg-[var(--color-latar)] font-[var(--font-poppins)]">
      <PageHeader2 title="Students" breadcrumb="Home / Students" />

      {/* Search and Add Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/2"
        />

        <button
          onClick={() => navigate("/students/form")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full md:w-auto"
        >
          + Tambah Student
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-[var(--color-hijau)] text-white">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">NIS</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Gender</th>
              <th className="py-3 px-4">School</th>
              <th className="py-3 px-4">Major</th>
              <th className="py-3 px-4">Grade</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Package</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.nis || "-"}</td>
                <td className="py-3 px-4">{student.email}</td>
                <td className="py-3 px-4">{student.gender}</td>
                <td className="py-3 px-4">{student.school}</td>
                <td className="py-3 px-4">{student.major}</td>
                <td className="py-3 px-4">{student.grade}</td>
                <td className="py-3 px-4">{student.phone}</td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${getPackageColor(
                      student.package_type
                    )}`}
                  >
                    {student.package_type || "None"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                      student.status
                    )}`}
                  >
                    {student.status || "Tidak Ada"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                    onClick={() => navigate(`/students/${student.id}`)}
                  >
                    View Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
