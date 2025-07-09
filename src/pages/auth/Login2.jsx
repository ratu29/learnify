import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Konfigurasi Supabase
const SUPABASE_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/admin";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

export default function Login2() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(
        `${SUPABASE_URL}?email=eq.${dataForm.email}&password=eq.${dataForm.password}`,
        {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (data.length > 0) {
        localStorage.setItem("authToken", "true");
        navigate("/");
      } else {
        setError("Email atau password salah.");
      }
    } catch (err) {
      setError("Gagal login. Periksa koneksi atau server.");
    } finally {
      setLoading(false);
    }
  };

  // Komponen error
  const errorInfo = error && (
    <div className="bg-red-100 mb-5 p-4 text-sm text-red-700 rounded-lg flex items-center">
      <BsFillExclamationDiamondFill className="me-2 text-xl" />
      {error}
    </div>
  );

  // Komponen loading
  const loadingInfo = loading && (
    <div className="bg-gray-100 mb-5 p-4 text-sm text-gray-700 rounded-lg flex items-center">
      <ImSpinner2 className="me-2 animate-spin text-lg" />
      Mohon tunggu sebentar...
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Masuk ke Akun Anda
      </h2>

      {errorInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email / Username
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
            value={dataForm.email}
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            onChange={handleChange}
            value={dataForm.password}
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
    </div>
  );
}
