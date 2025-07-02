import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader2 from "../components/PageHeader2";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/instructors";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY.replace("Bearer ", ""),
  Authorization: API_KEY,
};

const EXPERTISE_OPTIONS = [
  "Matematika", "Fisika", "Kimia", "Biologi", "Bahasa Indonesia", "Bahasa Inggris",
  "Akuntansi", "Ekonomi", "Teknik Komputer", "Pemrograman Web", "Desain Grafis",
  "Jaringan Komputer", "Keperawatan", "Farmasi", "Pariwisata"
];

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    const localQuotes = [
      "Belajar hari ini untuk masa depan yang lebih cerah.",
      "Tidak ada kata terlambat untuk memulai.",
      "Kamu lebih hebat dari yang kamu pikirkan.",
    ];
    setQuote(localQuotes[Math.floor(Math.random() * localQuotes.length)]);
  }, []);

  const fetchData = async () => {
    const res = await axios.get(API_URL, { headers });
    setInstructors(res.data);
  };

  const filtered = instructors.filter((instructor) => {
    const matchSearch = instructor.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchFilter = !filter || (instructor.expertise || []).includes(filter);
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen p-4 bg-[var(--color-latar)] font-[var(--font-poppins)]">
      <PageHeader2 title="Instructors" breadcrumb="Home / Instructors" />

      <div className="bg-indigo-100 text-indigo-800 p-4 rounded shadow mb-4">
        <strong>Inspirational Quote:</strong> {quote}
      </div>

      {/* Pencarian, Filter & Tambah Data sejajar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-3/4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded w-full md:w-1/2"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded w-full md:w-1/2"
          >
            <option value="">Semua Bidang</option>
            {EXPERTISE_OPTIONS.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-auto">
          <button
            onClick={() => navigate("/instructors/form")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full md:w-auto"
          >
            + Tambah Instruktur
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-[var(--color-hijau)] text-white">
            <tr>
              <th className="py-3 px-4">Profil</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Reviews</th>
              <th className="py-3 px-4">Expertise</th>
              <th className="py-3 px-4">Achievement</th>
              <th className="py-3 px-4">Certificate</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ins) => (
              <tr key={ins.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4 text-center">
                  {ins.profile_image ? (
                    <img
                      src={ins.profile_image}
                      alt={ins.name}
                      className="w-12 h-12 rounded-full object-cover mx-auto border"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="py-3 px-4">{ins.name}</td>
                <td className="py-3 px-4">{ins.rating}</td>
                <td className="py-3 px-4">{ins.reviews}</td>
                <td className="py-3 px-4">{(ins.expertise || []).join(", ")}</td>
                <td className="py-3 px-4">{ins.achievement}</td>
                <td className="py-3 px-4">{(ins.certificate || []).join(", ")}</td>
                <td className="py-3 px-4">
                  <button
                    className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                    onClick={() => navigate(`/instructors/${ins.id}`)}
                  >
                    View Detail
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
