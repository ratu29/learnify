// src/pages/CourseDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/registrations";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

// Fungsi warna status
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "no Progres":
      return "text-red-600 bg-red-100";
    case "on Progres":
      return "text-yellow-700 bg-yellow-100";
    case "completed":
      return "text-green-700 bg-green-100";
    default:
      return "text-gray-500 bg-gray-100";
  }
};

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}?id=eq.${id}`, { headers });
      setData(res.data[0]);
    } catch (err) {
      console.error("Gagal fetch:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      navigate("/courses");
    } catch (err) {
      alert("Gagal menghapus.");
    }
  };

  if (!data) return <div className="p-4">Loading detail kursus...</div>;

  return (
    <div className="p-6 bg-[var(--color-latar)] min-h-screen font-poppins">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
        <p className="text-sm text-gray-600 mb-2">Email: {data.email}</p>
        <p className="mb-2 text-gray-500">Paket: {data.package_type} | Harga: Rp{data.price}</p>
        <p className="mb-2">Metode: {data.payment_method} | No Rek: {data.account_number}</p>
        
        {data.proof_url && (
          <img
            src={data.proof_url}
            alt="Bukti"
            className="w-full max-h-60 object-contain rounded my-3"
          />
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {/* Verifikasi */}
          <span
            className={`inline-block px-2 py-1 text-sm rounded ${
              data.verifikasi === "terverifikasi"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {data.verifikasi || "pending"}
          </span>

          {/* Status */}
          {data.status && (
            <span
              className={`inline-block px-2 py-1 text-sm rounded ${getStatusColor(data.status)}`}
            >
              {data.status}
            </span>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate(`/courses/form?id=${data.id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
