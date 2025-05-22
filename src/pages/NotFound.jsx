import React from 'react';

function NotFound() {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-200 h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-12 text-center">
        <h1 className="text-9xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-3xl text-gray-700 mb-6">Oops! Halaman tidak ditemukan</p>
        <p className="text-gray-600 mb-8">
          Mungkin tautan yang Anda masukkan salah atau halaman telah dihapus.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
          onClick={() => window.history.back()}
        >
          Kembali
        </button>
      </div>
    </div>
  );
}

export default NotFound;