import InputField from "./components/InputField";
import { useState } from "react";
export default function UserForm() {
    const[nama, setNama]= useState("");
    const[email, setEmail]= useState("");
    const[tanggal_lahir, setTanggal_lahir]= useState("");

    return (
      <div className="flex flex-col items-center justify-center m-5 p-5 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Tambah User</h2>
          
          
        <InputField 
        label="Nama" 
        type="text"
        placeholder="Silahkan ketik Nama..."
        onChange={(e) => setNama(e.target.value)} 
        />
        {!nama ? (
                    <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p className="font-semibold">
                        Silahkan masukkan nama!!
                    </p>
                </div>
                ):null}

        <InputField 
        label="Email" 
        type="email" 
        placeholder="Silahkan ketik EMail..."
        onChange={(e) => setEmail(e.target.value)} 
        />
        {!email ? (
                    <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p className="font-semibold">
                        Silahkan masukkan email!!
                    </p>
                </div>
                ):null}

        <InputField label="Tanggal Lahir" type="date"
        onChange={(e) => setTanggal_lahir(e.target.value)} 
        />
        {!tanggal_lahir ? (
                    <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p className="font-semibold">
                        Silahkan masukkan tanggal lahir!!
                    </p>
                </div>
                ):null}

          <button className="w-full bg-green-500 mt-4 text-white p-2 rounded">
            Simpan
          </button>
        </div>
      </div>
    );
  }