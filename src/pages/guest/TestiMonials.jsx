import React, { useEffect, useState } from "react";
import testimonials from "../../data/testimonials.json";

const Testimonials = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">Apa Kata Pelanggan Kami</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg">{item.name}</h4>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic">"{item.review}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
