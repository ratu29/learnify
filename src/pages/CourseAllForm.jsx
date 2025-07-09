import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/courses";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export default function CourseAllForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    duration: "",
    level: "X",
    instructor: "",
    price: "",
    packagetype: "Paket Reguler",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ambil data kursus jika mode edit
  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}?id=eq.${id}&select=*`, {
        headers,
      });
      if (res.data.length > 0) {
        setForm(res.data[0]);
      } else {
        setError("Data tidak ditemukan.");
      }
    } catch (err) {
      setError("Gagal mengambil data kursus.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Jangan sertakan 'id' saat insert
    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      image: form.image,
      duration: form.duration,
      level: form.level,
      instructor: form.instructor,
      price: form.price,
      packagetype: form.packagetype,
    };

    try {
      if (id) {
        // Mode edit
        await axios.patch(`${API_URL}?id=eq.${id}`, payload, { headers });
      } else {
        // Mode tambah (insert)
        await axios.post(API_URL, payload, { headers });
      }

      navigate("/coursesAll");
    } catch (err) {
      console.error(err.response?.data || err.message);
      if (
        err.response?.data?.code === "23505" &&
        err.response?.data?.message?.includes("slug")
      ) {
        setError("Slug sudah digunakan. Silakan gunakan slug lain.");
      } else {
        setError("Gagal menyimpan data.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Edit Kursus" : "Tambah Kursus"}
      </h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Judul Kursus"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug (unik)"
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deskripsi"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL Gambar"
          className="w-full p-3 border rounded"
        />
        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Durasi (misal: 3 bulan)"
          className="w-full p-3 border rounded"
        />
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="X">X</option>
          <option value="XI">XI</option>
          <option value="XII">XII</option>
        </select>
        <input
          name="instructor"
          value={form.instructor}
          onChange={handleChange}
          placeholder="Instruktur"
          className="w-full p-3 border rounded"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Harga (misal: Rp500.000)"
          className="w-full p-3 border rounded"
        />
        <select
          name="packagetype"
          value={form.packagetype}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="Paket Reguler">Paket Reguler</option>
          <option value="Paket Intensif">Paket Intensif</option>
          <option value="Paket Premium">Paket Premium</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {loading ? "Menyimpan..." : id ? "Simpan Perubahan" : "Tambah Kursus"}
        </button>
      </form>
    </div>
  );
}
