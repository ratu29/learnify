import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login2() {
  // ✅ navigate: digunakan untuk berpindah halaman setelah login sukses
  const navigate = useNavigate();

  // ✅ loading: untuk menampilkan indikator proses login
  // ✅ error: untuk menyimpan pesan error saat login gagal
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ dataForm: menyimpan input email & password
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  // ✅ handleChange: memperbarui dataForm saat input berubah
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // ✅ handleSubmit: memproses form login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        }

        // ✅ Arahkan ke dashboard jika login sukses
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message || "Terjadi kesalahan.");
        } else {
          setError(err.message || "Terjadi kesalahan tak dikenal.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ✅ Komponen tampilan error
  const errorInfo = error && (
    <div className="bg-red-100 mb-5 p-4 text-sm text-red-700 rounded-lg flex items-center">
      <BsFillExclamationDiamondFill className="me-2 text-xl" />
      {error}
    </div>
  );

  // ✅ Komponen tampilan loading
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
