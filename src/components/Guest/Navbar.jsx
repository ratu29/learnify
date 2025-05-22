import React from "react";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${
          isActive
            ? "text-[#FF9671] bg-white-200 font-extrabold"
            : "text-black hover:text-[#FF9671] hover:bg-white-200 hover:font-bold"
        }`;
  return (
    <nav className="bg-white w-full shadow-sm py-4 px-6 md:px-20 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
       <Logo/>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
      <NavLink to="/home" className={menuClass}>
          Home
        </NavLink>

        <NavLink to="/about" className={menuClass}>
          About
        </NavLink>  

        <NavLink to="/product" className={menuClass}>
          Top Product
        </NavLink> 
        <NavLink to="/testimoni" className={menuClass}>
          Ulasan Pelanggan
        </NavLink> 

      </ul>

      {/* Button */}
      <Link to="/login" className="hidden md:block bg-[#FF9671] hover:bg-[#ff8150] text-white font-semibold px-6 py-2 rounded-full">
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
