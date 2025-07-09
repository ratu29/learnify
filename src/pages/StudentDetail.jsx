import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/students";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

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
    return "bg-red-500 text-white";
  }
};

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

export default function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}?id=eq.${id}`, { headers })
      .then((res) => {
        setStudent(res.data[0]);
      })
      .catch((err) => {
        console.error("Gagal mengambil data student:", err);
      });
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Yakin ingin menghapus data siswa?");
    if (confirm) {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      navigate("/students");
    }
  };

  if (!student) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white mt-6 rounded shadow text-gray-800">
      <h2 className="text-2xl font-bold mb-6">Detail Student</h2>

      <div className="space-y-2 text-base">
        <p><strong>Nama:</strong> {student.name}</p>
        <p><strong>NIS:</strong> {student.nis || "-"}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Jenis Kelamin:</strong> {student.gender}</p>
        <p><strong>Asal Sekolah:</strong> {student.school}</p>
        <p><strong>Jurusan:</strong> {student.major}</p>
        <p><strong>Kelas:</strong> {student.grade}</p>
        <p><strong>No HP:</strong> {student.phone}</p>
        <p><strong>Terdaftar Sejak:</strong> {new Date(student.created_at).toLocaleDateString()}</p>

        <p><strong>Package:</strong>{" "}
          <span className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${getPackageColor(student.package_type)}`}>
            {student.package_type || "Tidak Ada"}
          </span>
        </p>

        <p><strong>Status:</strong>{" "}
          <span className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${getStatusColor(student.status)}`}>
            {student.status || "Tidak Ada"}
          </span>
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate(`/students/form?id=${id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
