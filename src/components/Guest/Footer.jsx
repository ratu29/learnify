import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-100 text-gray-800 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* INFO KONTAK */}
        <div>
          <h4 className="text-xl font-bold mb-4">Kontak Kami</h4>
          <p>Alamat: Jl. Mawar No. 123, Pekanbaru</p>
          <p>Telepon: 0812-3456-7890</p>
          <p>Email: info@tokokue.com</p>
        </div>

        {/* SOSIAL MEDIA */}
        <div>
          <h4 className="text-xl font-bold mb-4">Ikuti Kami</h4>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-pink-500">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-green-500">
              <FaWhatsapp size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaFacebookF size={24} />
            </a>
          </div>
        </div>

        {/* PARTNER */}
        <div>
          <h4 className="text-xl font-bold mb-4">Partner Kami</h4>
          <div className="flex gap-4 items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png"
              alt="Google"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Shopify_logo_2018.svg"
              alt="Shopify"
              className="h-8"
            />
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Toko Kue. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
