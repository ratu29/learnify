import React, { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaShoppingCart,
} from "react-icons/fa";

const CekStok = () => {
  const [kode, setKode] = useState("");
  const [pesan, setPesan] = useState(null);
  const [dataProduk, setDataProduk] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPesan(null);
    setDataProduk(null);
    setError("");

    if (kode.trim() === "") {
      setError("Kode produk tidak boleh kosong.");
      return;
    }
    if (kode.trim().length < 4) {
      setError("Kode produk minimal 4 karakter.");
      return;
    }

    try {
      const response = await fetch("/data/produk.json");
      const data = await response.json();
      const found = data.find(
        (item) => item.kode_produk.toUpperCase() === kode.toUpperCase()
      );

      if (!found) {
        setPesan("not_found");
      } else if (found.stok > 0) {
        setPesan("tersedia");
        setDataProduk(found);
      } else {
        setPesan("habis");
        setDataProduk(found);
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat mengambil data.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Cek Ketersediaan Produk
        </h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Masukkan kode produk (cth: K001)"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Cek Stok
          </button>
        </form>

        {/* CARD RESULT */}
        {(pesan === "tersedia" || pesan === "habis") && dataProduk && (
          <div className="bg-gray-50 border rounded-xl p-6 shadow-inner text-center">
            <div className="mb-4">
              {pesan === "tersedia" ? (
                <FaCheckCircle size={40} className="text-green-500 mb-2 mx-auto" />
              ) : (
                <FaExclamationTriangle size={40} className="text-yellow-500 mb-2 mx-auto" />
              )}
              <h2 className="text-lg font-bold text-gray-800">{dataProduk.nama_produk}</h2>
              <p className="text-gray-600">
                Harga: <strong>Rp{dataProduk.harga.toLocaleString()}</strong>
              </p>
              <p className="text-gray-600">
                Stok: <strong>{dataProduk.stok}</strong>
              </p>
            </div>
            <div className="mt-4">
              {pesan === "tersedia" ? (
                <FaShoppingCart size={50} className="text-green-600 mx-auto" />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1621/1621635.png"
                  alt="Out of Stock"
                  className="w-20 mx-auto"
                />
              )}
            </div>
          </div>
        )}

        {pesan === "not_found" && (
          <div className="bg-red-50 border border-red-300 rounded-xl p-6 mt-4 text-center">
            <FaTimesCircle size={40} className="text-red-500 mb-2 mx-auto" />
            <p className="text-red-700 font-medium">❌ Kode produk tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CekStok;
