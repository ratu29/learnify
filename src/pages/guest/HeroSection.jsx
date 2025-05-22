import React from "react";
import { FaGoogle, FaLinkedin } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6 z-10">
          <p className="text-lg text-pink-700 font-medium">Manisnya Setiap Gigitan</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Hadirkan Kebahagiaan <br />
            Lewat <span className="text-[#FF9671]">Kue Spesial</span> dari Kami
          </h1>
          <p className="text-gray-600 text-lg">
            Temukan beragam pilihan kue lezat untuk setiap momen berharga. Kami menggunakan bahan berkualitas terbaik dan resep spesial buatan rumahan, agar setiap gigitan memberikan rasa yang tak terlupakan untuk Anda dan keluarga.
          </p>

          {/* RATINGS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <FaGoogle className="text-2xl text-[#4285F4]" />
              <div>
                <p className="text-lg font-semibold">4.9 ⭐⭐⭐⭐⭐</p>
                <p className="text-gray-500 text-sm">Best Rated On Google</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaLinkedin className="text-2xl text-[#0077B5]" />
              <div>
                <p className="text-lg font-semibold">4.8 ⭐⭐⭐⭐⭐</p>
                <p className="text-gray-500 text-sm">Most Recommended Bakery</p>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button className="bg-[#FF6F61] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#ff543d]">
              Pesan Sekarang
            </button>
            <button className="bg-[#53C1DE] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#3bb1cf]">
              Lihat Menu
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE + BADGES */}
        <div className="relative z-10 flex justify-center items-center">
          <div className="relative w-full max-w-md">
            <img
              src="https://i.pinimg.com/736x/4f/61/ee/4f61ee3929c3a1ab3b41c133a5ec77a3.jpg"
              alt="Happy woman"
              className="w-full h-auto rounded-2xl object-cover shadow-lg"
            />
            {/* Badge 1 */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <div className="bg-green-400 h-2 w-8 rounded-full"></div>
              <span className="text-green-500">🎂</span>
            </div>
            {/* Badge 2 */}
            <div className="absolute bottom-6 left-0 bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <div>
                <p className="text-sm font-semibold text-gray-700">"Super enak!"</p>
              </div>
            </div>
            {/* Badge 3 */}
            <div className="absolute top-4 right-0 bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2">
              <img
                src="https://randomuser.me/api/portraits/men/11.jpg"
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <span className="text-yellow-500">💖</span>
            </div>
          </div>
        </div>
      </div>

      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10 bg-cover -z-10" />
    </section>
  );
};

export default HeroSection;
