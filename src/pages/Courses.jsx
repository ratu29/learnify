import { useEffect, useState } from "react";
import PageHeader2 from "../components/PageHeader2";
import { Link, useNavigate } from "react-router-dom";
import quotes from "../quotes.json";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/registrations";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  Prefer: "return=representation",
};

export default function Courses() {
  const [quote, setQuote] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get(API_URL, { headers });
      const sorted = res.data.sort((a, b) => b.id - a.id);
      setRegistrations(sorted);
    } catch (err) {
      console.error("Gagal fetch:", err);
    }
  };

  const filtered = registrations.filter((r) => {
    const byCategory = category === "All" || r.package_type === category;
    const bySearch = r.name.toLowerCase().includes(search.toLowerCase());
    return byCategory && bySearch;
  });

  const categories = ["All", ...new Set(registrations.map((r) => r.package_type))];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "no progres":
        return "text-red-700 bg-red-100";
      case "on progres":
        return "text-yellow-700 bg-yellow-100";
      case "completed":
        return "text-green-700 bg-green-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="flex min-h-screen w-full font-poppins bg-[var(--color-latar)]">
      <div className="flex-1 flex flex-col w-full h-screen overflow-auto">
        <PageHeader2 title="All Courses" breadcrumb="Home / Courses" />

        {quote && (
          <div className="bg-white shadow mx-4 my-4 rounded-lg p-4">
            <p className="text-lg italic text-gray-700">"{quote.quote}"</p>
            <p className="text-sm text-right text-gray-500 mt-2">- {quote.author}</p>
          </div>
        )}

        <div className="px-4">
          <div className="flex items-center justify-between gap-4 my-4">
            <div className="flex items-center gap-4 flex-1">
              <input
                type="text"
                placeholder="Cari nama..."
                className="p-2 rounded border flex-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="p-2 border rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => navigate("/courses/form")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Tambah Data
            </button>
          </div>
        </div>

        <div className="p-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <Link
                key={item.id}
                to={`/courses/detail/${item.id}`}
                className="bg-white p-4 rounded shadow hover:shadow-md transition"
              >
                <h4 className="font-semibold text-lg text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.course_slug}</p>
                <p className="text-sm text-gray-400">Paket: {item.package_type}</p>

                <p
                  className={`text-sm font-semibold mt-2 px-2 py-1 rounded w-fit ${
                    item.verifikasi === "terverifikasi"
                      ? "text-green-600 bg-green-100"
                      : "text-red-600 bg-red-100"
                  }`}
                >
                  {item.verifikasi || "pending"}
                </p>

                {item.status && (
                  <p
                    className={`text-sm font-semibold mt-1 px-2 py-1 rounded w-fit ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
