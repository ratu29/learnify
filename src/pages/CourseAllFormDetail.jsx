import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/courses";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

export default function CourseAllFormDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}?id=eq.${id}&limit=1`, { headers }).then((res) => {
      setData(res.data[0]);
    });
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Yakin ingin menghapus course ini?");
    if (confirm) {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      navigate("/coursesAll");
    }
  };

  if (!data) return <div className="p-4">Memuat detail course...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white mt-6 rounded shadow font-[var(--font-poppins)]">
      <h2 className="text-3xl font-bold mb-4">{data.title}</h2>

      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full max-w-md h-64 object-cover rounded mb-4"
        />
      )}

      <p><strong>Slug:</strong> {data.slug}</p>
      <p><strong>Description:</strong> {data.description}</p>
      <p><strong>Duration:</strong> {data.duration}</p>
      <p><strong>Level:</strong> {data.level}</p>
      <p><strong>Instructor:</strong> {data.instructor}</p>
      <p><strong>Price:</strong> Rp {data.price}</p>
      <p><strong>Package:</strong> {data.packagetype || "Tidak ada"}</p>
      <p><strong>Status:</strong> {data.status || "Tidak ditentukan"}</p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate(`/coursesAll/form?id=${id}`)}
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
