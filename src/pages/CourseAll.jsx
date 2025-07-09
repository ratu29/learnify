import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader2 from "../components/PageHeader2";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/courses";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

export default function CourseAll() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(API_URL, { headers });
      setCourses(res.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredCourses.length / pageSize);

  const getPackageColor = (type) => {
    if (!type) return "bg-gray-300 text-black";
    const normalized = type.trim().toLowerCase();

    switch (normalized) {
      case "paket reguler":
        return "bg-green-500 text-white";
      case "paket intensif":
        return "bg-yellow-400 text-black";
      case "paket premium":
        return "bg-purple-600 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="min-h-screen p-4 bg-[var(--color-latar)] font-[var(--font-poppins)]">
      <PageHeader2 title="Courses" breadcrumb="Home / Courses" />

      {/* Search and Add Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset ke halaman 1 saat search
          }}
          className="px-4 py-2 border rounded w-full md:w-1/2"
        />

        <button
          onClick={() => navigate("/coursesAll/form")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full md:w-auto"
        >
          + Tambah Course
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-[var(--color-hijau)] text-white">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Duration</th>
              <th className="py-3 px-4">Level</th>
              <th className="py-3 px-4">Instructor</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Package</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{course.title}</td>
                <td className="py-3 px-4">{course.slug}</td>
                <td className="py-3 px-4">{course.description}</td>
                <td className="py-3 px-4">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="py-3 px-4">{course.duration}</td>
                <td className="py-3 px-4">{course.level}</td>
                <td className="py-3 px-4">{course.instructor}</td>
                <td className="py-3 px-4">{course.price}</td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${getPackageColor(
                      course.packagetype
                    )}`}
                  >
                    {course.packagetype || "None"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    View Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[var(--color-hijau)] text-white hover:bg-green-700"
          }`}
        >
          Previous
        </button>

        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </p>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[var(--color-hijau)] text-white hover:bg-green-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
