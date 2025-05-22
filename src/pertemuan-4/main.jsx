import { createRoot } from "react-dom/client";  
import './tailwind.css';  
import AdminStudentList from "./AdminStudentList"; // Import komponen Admin  

createRoot(document.getElementById("root"))  
  .render(  
    <div>  
      <h1 className="text-2xl font-bold text-center my-5">Manajemen Murid Learnify</h1>  
      <AdminStudentList />  {/* Menampilkan daftar murid untuk Admin */}  
    </div>  
  );  