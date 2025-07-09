// src/pages/RegistrationForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [form, setForm] = useState({
    name: "",
    email: "",
    course_slug: "",
    package_type: "",
    price: "",
    payment_method: "",
    account_number: "",
    proof_url: "",
    verifikasi: "pending",
    status: "No Progres",
    gmeet: "",
    zoomlink: "",
  });

  const [courseOptions, setCourseOptions] = useState([]);

  const bankOptions = {
    BCA: "BCA 1234567890 a.n PT Learnify",
    BNI: "BNI 9876543210 a.n PT Learnify",
    Mandiri: "Mandiri 1122334455 a.n PT Learnify",
    BRI: "BRI 5566778899 a.n PT Learnify",
  };

  const packageOptions = ["Paket Reguler", "Paket Intensif", "Paket Premium"];
  const statusOptions = ["No Progres", "On Progres", "Completed"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "payment_method") {
      const rekening = bankOptions[value] || "";
      setForm({ ...form, [name]: value, account_number: rekening });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${API_URL}/registrations?id=eq.${id}`, form, { headers });
      } else {
        await axios.post(`${API_URL}/registrations`, form, { headers });
      }
      navigate("/courses");
    } catch (err) {
      alert("Gagal menyimpan data.");
      console.error("ERROR:", err.response?.data || err.message);
    }
  };

  const fetchExisting = async () => {
    if (id) {
      try {
        const res = await axios.get(`${API_URL}/registrations?id=eq.${id}&limit=1`, {
          headers,
        });
        if (res.data.length > 0) {
          setForm({
            ...res.data[0],
            gmeet: res.data[0].gmeet || "",
            zoomlink: res.data[0].zoomlink || "",
            status: res.data[0].status || "No Progres",
          });
        }
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    }
  };

  const fetchCourseSlugs = async () => {
    try {
      const res = await axios.get(`${API_URL}/courses?select=slug,title`, { headers });
      setCourseOptions(res.data);
    } catch (err) {
      console.error("Gagal mengambil data course:", err);
    }
  };

  useEffect(() => {
    fetchExisting();
    fetchCourseSlugs();
  }, [id]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Pendaftaran" : "Form Pendaftaran"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nama Lengkap" className="w-full p-3 border rounded" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-3 border rounded" required />

        <select name="course_slug" value={form.course_slug} onChange={handleChange} className="w-full p-3 border rounded" required>
          <option value="">Pilih Course</option>
          {courseOptions.map((course) => (
            <option key={course.slug} value={course.slug}>{course.title}</option>
          ))}
        </select>

        <select name="package_type" value={form.package_type} onChange={handleChange} className="w-full p-3 border rounded" required>
          <option value="">Pilih Paket</option>
          {packageOptions.map((pkg, i) => (
            <option key={i} value={pkg}>{pkg}</option>
          ))}
        </select>

        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Harga (Rp)" className="w-full p-3 border rounded" required />

        <select name="payment_method" value={form.payment_method} onChange={handleChange} className="w-full p-3 border rounded" required>
          <option value="">Pilih Bank Pembayaran</option>
          {Object.keys(bankOptions).map((bank, i) => (
            <option key={i} value={bank}>{bank}</option>
          ))}
        </select>

        {form.account_number && (
          <div className="bg-gray-100 p-3 rounded text-sm text-gray-700">
            <strong>No. Rekening:</strong> {form.account_number}
          </div>
        )}

        {/* Input URL Bukti Pembayaran */}
        <div>
          <label className="block mb-1 font-medium">Link URL Gambar Bukti Pembayaran</label>
          <input
            name="proof_url"
            value={form.proof_url}
            onChange={handleChange}
            placeholder="https://contoh.com/bukti.jpg"
            className="w-full p-3 border rounded"
          />
          {form.proof_url && (
            <img src={form.proof_url} alt="Bukti Pembayaran" className="mt-2 h-32 object-contain rounded border" />
          )}
        </div>

        <input name="gmeet" value={form.gmeet} onChange={handleChange} placeholder="Link Gmeet (opsional)" className="w-full p-3 border rounded" />
        <input name="zoomlink" value={form.zoomlink} onChange={handleChange} placeholder="Link Zoom (opsional)" className="w-full p-3 border rounded" />

        <select name="verifikasi" value={form.verifikasi} onChange={handleChange} className="w-full p-3 border rounded">
          <option value="pending">Pending</option>
          <option value="terverifikasi">Terverifikasi</option>
        </select>

        {/* Status yang diubah */}
        <select name="status" value={form.status} onChange={handleChange} className="w-full p-3 border rounded">
          {statusOptions.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full">
          {id ? "Simpan Perubahan" : "Daftar Sekarang"}
        </button>
      </form>
    </div>
  );
}
