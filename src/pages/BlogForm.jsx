import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/blog";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export default function BlogForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [form, setForm] = useState({
    date: "",
    title: "",
    image: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}?id=eq.${id}&limit=1`, { headers });
      if (res.data.length > 0) {
        setForm(res.data[0]);
      } else {
        setError("Data tidak ditemukan.");
      }
    } catch (err) {
      setError("Gagal mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date || !form.title) {
      setError("Tanggal dan Judul wajib diisi.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (id) {
        await axios.put(`${API_URL}?id=eq.${id}`, form, { headers });
      } else {
        await axios.post(API_URL, form, { headers });
      }
      navigate("/blog");
    } catch (err) {
      console.error("Gagal menyimpan:", err.response?.data || err.message);
      setError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Tambah"} Blog</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div className="text-gray-600">Memuat data...</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Tanggal (mis. 2025-06-26)"
          type="text"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Judul Blog"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL Gambar"
          type="url"
          className="w-full p-3 border rounded"
        />
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="w-full h-48 object-cover mt-2 rounded border"
          />
        )}
        <input
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="Link Artikel (mis. https://...)"
          type="url"
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {loading ? "Menyimpan..." : id ? "Simpan Perubahan" : "Tambah Blog"}
        </button>
      </form>
    </div>
  );
}
