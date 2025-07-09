import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/students";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export default function StudentForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "Male",
    school: "",
    major: "",
    grade: "X",
    phone: "",
    nis: "",
    status: "No Progres",
    package_type: "Paket Reguler", // Default value
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}?id=eq.${id}&limit=1`, { headers });
      if (res.data.length > 0) {
        setForm(res.data[0]);
      } else {
        setError("Data siswa tidak ditemukan.");
      }
    } catch (err) {
      setError("Gagal memuat data siswa.");
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

    if (!form.name || !form.email || !form.password) {
      setError("Nama, email, dan password wajib diisi.");
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
      navigate("/students");
    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      setError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Data Siswa" : "Tambah Siswa Baru"}</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div className="text-gray-600">Memuat data...</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 border rounded"
          required
        />
        <div>
          <label className="block font-semibold mb-1">Jenis Kelamin</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="Male">Laki-laki</option>
            <option value="Female">Perempuan</option>
          </select>
        </div>
        <input
          name="nis"
          value={form.nis}
          onChange={handleChange}
          placeholder="NIS"
          className="w-full p-3 border rounded"
        />
        <input
          name="school"
          value={form.school}
          onChange={handleChange}
          placeholder="Asal Sekolah"
          className="w-full p-3 border rounded"
        />
        <input
          name="major"
          value={form.major}
          onChange={handleChange}
          placeholder="Jurusan"
          className="w-full p-3 border rounded"
        />
        <div>
          <label className="block font-semibold mb-1">Kelas / Tingkat</label>
          <select
            name="grade"
            value={form.grade}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="X">X</option>
            <option value="XI">XI</option>
            <option value="XII">XII</option>
          </select>
        </div>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="No. HP"
          className="w-full p-3 border rounded"
        />
        <div>
          <label className="block font-semibold mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="No Progres">No Progres</option>
            <option value="On Progres">On Progres</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Jenis Paket</label>
          <select
            name="package_type"
            value={form.package_type}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="Paket Reguler">Paket Reguler</option>
            <option value="Paket Intensif">Paket Intensif</option>
            <option value="Paket Premium">Paket Premium</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {loading ? "Menyimpan..." : id ? "Simpan Perubahan" : "Tambah Siswa"}
        </button>
      </form>
    </div>
  );
}
