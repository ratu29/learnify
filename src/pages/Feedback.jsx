import { useEffect, useState } from "react";
import PageHeader2 from "../components/PageHeader2";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/feedback";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    rating: "",
    deskripsi: "",
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`${API_URL}?order=tanggal.desc`, { headers });
      setFeedbackList(res.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddFeedback = async () => {
    const { nama, rating, deskripsi } = formData;
    if (!nama || !rating || !deskripsi) {
      alert("Semua field harus diisi.");
      return;
    }

    try {
      await axios.post(API_URL, { ...formData }, { headers });
      setFormData({ nama: "", rating: "", deskripsi: "" });
      fetchFeedback();
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus feedback ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      fetchFeedback();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const filtered = feedbackList.filter((item) =>
    item.nama?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 bg-[var(--color-latar)] font-[var(--font-poppins)]">
      <PageHeader2 title="Feedback" breadcrumb="Home / Feedback" />

      {/* Form Tambah Feedback */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Tambah Feedback Baru</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="nama" className="text-sm text-gray-600">Nama</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nama"
            />
          </div>
          <div>
            <label htmlFor="rating" className="text-sm text-gray-600">Rating (1-5)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              min="1"
              max="5"
              placeholder="Rating"
            />
          </div>
          <div>
            <label htmlFor="deskripsi" className="text-sm text-gray-600">Deskripsi</label>
            <input
              type="text"
              id="deskripsi"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Deskripsi"
            />
          </div>
        </div>
        <button
          onClick={handleAddFeedback}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          + Tambah Feedback
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/2"
        />
      </div>

      {/* Tabel Feedback */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-[var(--color-hijau)] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Nama</th>
              <th className="py-3 px-4 text-left">Rating</th>
              <th className="py-3 px-4 text-left">Deskripsi</th>
              <th className="py-3 px-4 text-left">Tanggal</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{item.nama}</td>
                <td className="py-3 px-4">{item.rating}</td>
                <td className="py-3 px-4">{item.deskripsi}</td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {new Date(item.tanggal).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                  Tidak ada feedback ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
