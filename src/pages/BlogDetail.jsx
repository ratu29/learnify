import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/blog";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}?id=eq.${id}&limit=1`, { headers })
      .then((res) => {
        setBlog(res.data[0]);
      })
      .catch((err) => console.error("Gagal mengambil detail blog:", err));
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Yakin ingin menghapus blog ini?");
    if (confirm) {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      navigate("/blog");
    }
  };

  if (!blog) return <div className="p-4">Memuat detail blog...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white mt-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-60 object-cover rounded mb-4"
        />
      )}

      <p className="text-gray-500 mb-2">Tanggal: {blog.date}</p>

      {blog.url && (
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-4 text-blue-600 hover:underline"
        >
          Kunjungi Artikel
        </a>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate(`/blog/form?id=${id}`)}
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
