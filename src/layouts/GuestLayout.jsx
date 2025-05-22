import { Outlet } from "react-router-dom";  
import Navbar from "../components/Guest/Navbar";  
import Footer from "../components/Guest/Footer";  

export default function GuestLayout() {  
  return (  
    <div className="min-h-screen flex flex-col bg-gray-100">  
      {/* Navbar */}  
      <Navbar />  

      {/* Konten utama / halaman */}  
      <div className="flex-1">  
        <Outlet />  
      </div>  

      {/* Footer di bagian paling bawah */}  
      <Footer />  
    </div>  
  );  
}  