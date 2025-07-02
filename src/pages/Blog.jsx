import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader2 from "../components/PageHeader2";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/blog";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL, { headers });
      setBlogs(res.data);
    } catch (err) {
      console.error("Gagal memuat data blog:", err);
    }
  };

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 bg-[var(--color-latar)] font-[var(--font-poppins)]">
      <PageHeader2 title="Blog" breadcrumb="Home / Blog" />

      {/* Search + Tambah */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Cari berdasarkan judul..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-2/3"
        />
        <button
          onClick={() => navigate("/blog/form")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Tambah Blog
        </button>
      </div>

      {/* Tabel Blog */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-[var(--color-hijau)] text-white">
            <tr>
              <th className="py-3 px-4">Gambar</th>
              <th className="py-3 px-4">Judul</th>
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4">URL</th>
              <th className="py-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((blog) => (
              <tr key={blog.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4 text-center">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-12 h-12 object-cover rounded mx-auto border"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="py-3 px-4">{blog.title}</td>
                <td className="py-3 px-4">{blog.date}</td>
                <td className="py-3 px-4 text-blue-600 underline">
                  {blog.url ? (
                    <a href={blog.url} target="_blank" rel="noopener noreferrer">
                      Kunjungi
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                  >
                    Detail
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
