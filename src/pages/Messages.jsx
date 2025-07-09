import { useEffect, useState } from "react";
import PageHeader2 from "../components/PageHeader2";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/messages";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY.replace("Bearer ", ""),
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quote, setQuote] = useState("");
  const [formData, setFormData] = useState({
    message: "",
  });

  useEffect(() => {
    fetchMessages();
    const localQuotes = [
      "Feedback adalah kunci pertumbuhan.",
      "Setiap pesan adalah kesempatan untuk belajar.",
      "Suara pengguna membentuk masa depan kita.",
    ];
    setQuote(localQuotes[Math.floor(Math.random() * localQuotes.length)]);
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}?order=created_at.desc`, { headers });
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddMessage = async () => {
    if (!formData.message) {
      alert("Pesan harus diisi.");
      return;
    }

    const dataToSend = {
      name: "Admin", // Default name
      email: "ganeshaOperation@gmail.com", // Default email
      message: formData.message,
    };

    try {
      await axios.post(API_URL, dataToSend, { headers });
      setFormData({ message: "" });
      fetchMessages();
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus pesan ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const filtered = messages.filter((msg) =>
    msg.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 bg-[var(--color-latar)] font-[var(--font-poppins)]">
      <PageHeader2 title="Messages" breadcrumb="Home / Messages" />

      {/* Quote Section */}
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow mb-4">
        <strong>Quote:</strong> {quote}
      </div>

      {/* Form Tambah Pesan */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Tambah Pesan Baru</h2>
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 text-sm font-medium text-gray-600">
            Pesan
          </label>
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Pesan"
            value={formData.message}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded w-full"
          />
        </div>
        <button
          onClick={handleAddMessage}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          + Tambah Pesan
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/2"
        />
      </div>

      {/* Tabel Pesan */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-[var(--color-hijau)] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Message</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((msg) => (
              <tr key={msg.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{msg.name}</td>
                <td className="py-3 px-4">{msg.email}</td>
                <td className="py-3 px-4">{msg.message}</td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {new Date(msg.created_at).toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleDelete(msg.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
