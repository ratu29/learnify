import React from "react";

const About = () => {
  return (
    <section className="bg-[#FFF7F1] py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Tentang Kami</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          <span className="font-semibold text-[#FF9671]">Sedap</span> adalah brand kue rumahan yang
          berdedikasi untuk menghadirkan rasa manis terbaik dalam setiap gigitan. Kami percaya bahwa kue bukan
          hanya makanan, melainkan simbol kebahagiaan dalam setiap perayaan. Semua produk kami dibuat dengan
          bahan-bahan berkualitas, tanpa pengawet, dan penuh cinta.
        </p>
        <div className="grid md:grid-cols-3 gap-8 pt-10">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-[#FF6F61] mb-2">Bahan Premium</h3>
            <p className="text-gray-600 text-sm">
              Kami hanya menggunakan bahan pilihan seperti mentega asli, cokelat Belgia, dan susu segar untuk rasa yang tak terlupakan.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-[#FF6F61] mb-2">Resep Original</h3>
            <p className="text-gray-600 text-sm">
              Setiap kue dibuat dari resep keluarga yang telah diturunkan secara turun-temurun dan disukai banyak orang.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-[#FF6F61] mb-2">Pelayanan Ramah</h3>
            <p className="text-gray-600 text-sm">
              Kami mengutamakan kepuasan pelanggan dengan layanan cepat, ramah, dan selalu siap membantu kebutuhan pemesanan Anda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
