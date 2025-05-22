import React, { useEffect, useState } from "react";
import Product from "../../data/Product.json";

const TopProduct = () => {

  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Produk Unggulan Kami</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Product.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-pink-600 font-bold mt-2">Rp{product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopProduct;
