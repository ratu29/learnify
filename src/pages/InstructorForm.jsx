import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/instructors";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const EXPERTISE_OPTIONS = [
  "Matematika", "Fisika", "Kimia", "Biologi", "Bahasa Indonesia", "Bahasa Inggris",
  "Akuntansi", "Ekonomi", "Teknik Komputer", "Pemrograman Web", "Desain Grafis",
  "Jaringan Komputer", "Keperawatan", "Farmasi", "Pariwisata"
];

export default function InstructorForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [form, setForm] = useState({
    profile_image: "",
    name: "",
    rating: "",
    reviews: "",
    expertise: [],
    achievement: "",
    certificate: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) fetchInstructor();
  }, [id]);

  const fetchInstructor = async () => {
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
    if (name === "certificate") {
      setForm({ ...form, [name]: value.split(",").map((v) => v.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleExpertiseChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm({ ...form, expertise: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.reviews) {
      setError("Nama, rating, dan reviews wajib diisi.");
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
      navigate("/instructors");
    } catch (err) {
      console.error("Gagal menyimpan:", err.response?.data || err.message);
      setError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Tambah"} Instruktur</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div className="text-gray-600">Memuat data...</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-semibold">Link URL Foto Profil</label>
        <input
          type="url"
          name="profile_image"
          value={form.profile_image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full p-3 border rounded"
        />
        {form.profile_image && (
          <img
            src={form.profile_image}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2 rounded-full border"
          />
        )}

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating (0.0 - 5.0)"
          type="number"
          step="0.1"
          min="0"
          max="5"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="reviews"
          value={form.reviews}
          onChange={handleChange}
          placeholder="Jumlah Reviews"
          type="number"
          className="w-full p-3 border rounded"
          required
        />

        <label className="block font-semibold">Bidang Keahlian (Expertise)</label>
        <select
          multiple
          value={form.expertise}
          onChange={handleExpertiseChange}
          className="w-full p-3 border rounded h-40"
        >
          {EXPERTISE_OPTIONS.map((item, idx) => (
            <option key={idx} value={item}>{item}</option>
          ))}
        </select>

        <input
          name="achievement"
          value={form.achievement}
          onChange={handleChange}
          placeholder="Prestasi (achievement)"
          className="w-full p-3 border rounded"
        />
        <input
          name="certificate"
          value={form.certificate.join(", ")}
          onChange={handleChange}
          placeholder="Sertifikat (pisahkan dengan koma)"
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {loading ? "Menyimpan..." : id ? "Simpan Perubahan" : "Tambah Instruktur"}
        </button>
      </form>
    </div>
  );
}
