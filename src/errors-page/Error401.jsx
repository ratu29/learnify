import React from 'react';
import Sidebar2 from '../components/Sidebar2';
import Header2 from '../components/Header2';
import PageHeader2 from '../components/PageHeader2';

function Error401() {
  return (
    <div className="flex h-screen bg-orange-50 w-full">
      {/* Sidebar */}
      <Sidebar2 />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header2 />

        {/* Error Message Content */}
        <div className="flex flex-grow items-center justify-center px-6 pb-12">
          <div className="bg-white rounded-lg shadow-xl p-12 text-center w-full max-w-xl">
            <h1 className="text-9xl font-bold text-orange-500 mb-4">401</h1>
            <p className="text-3xl text-gray-700 mb-6">Tidak Terautentikasi</p>
            <p className="text-gray-600 mb-8">
              Anda harus login untuk mengakses halaman ini.
            </p>
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
              onClick={() => window.location.href = '/login'}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error401;
