import InputField from "./components/InputField";
import Alert from "./components/Alert";
import Card from "./components/Card";
import { useState } from "react";

export default function Learnify() {
  const [judulMateri, setJudulMateri] = useState("");
  const [durasiJam, setDurasiJam] = useState("");
  const [kategori, setKategori] = useState("");

  const isJudulValid = judulMateri.length >= 3;
  const isDurasiValid = durasiJam.length > 0 && !isNaN(durasiJam) && durasiJam > 0;
  const isFormValid = judulMateri && isJudulValid && durasiJam && isDurasiValid && kategori;

  return (
    <div className="flex flex-col items-center justify-center m-5 p-5 bg-gradient-to-r from-pink-100 via-pink-200 to-purple-300 min-h-screen">
      <Card judul="🎓📚 Tambah Materi 🎓📚" className="shadow-lg rounded-2xl p-6 bg-white">
        <InputField 
          label="Judul Materi" 
          type="text"
          placeholder="Silakan ketik judul materi..."
          onChange={(e) => setJudulMateri(e.target.value)} 
          className="mb-3"
        />
        {!judulMateri && <Alert pesan="Silakan masukkan judul materi!" type="kosong" />}
        {judulMateri && !isJudulValid && <Alert pesan="Judul materi minimal 3 karakter!" type="warning" />}

        <InputField 
          label="Durasi (jam)" 
          type="number" 
          placeholder="Silakan ketik durasi dalam jam..."
          onChange={(e) => setDurasiJam(e.target.value)} 
          className="mb-3"
        />
        {!durasiJam && <Alert pesan="Silakan masukkan durasi materi!" type="kosong" />}
        {durasiJam && !isDurasiValid && <Alert pesan="Durasi harus berupa angka positif!" type="warning" />}

        <div className="mt-3">
          <label className="block text-sm font-medium text-purple-800">Kategori Materi</label>
          <select 
            className="w-full mt-2 p-2 border rounded-lg bg-pink-50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" 
            onChange={(e) => setKategori(e.target.value)}
          >
            <option value="">🔽 Pilih kategori...</option>
            <option value="literasi">📖 Literasi dalam Bahasa Indonesia dan Bahasa Inggris</option>
            <option value="tps">🧠 Tes Potensi Skolastik (TPS)</option>
            <option value="matematika">🔢 Penalaran Matematika</option>
            <option value="kuantitatif">📊 Pengetahuan Kuantitatif</option>
          </select>
          {!kategori && <Alert pesan="Silakan pilih kategori materi!" type="kosong" />}
        </div>

        {isFormValid && (
          <button className="w-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 mt-5 text-white p-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105 text-sm">
            Simpan
          </button>
        )}
      </Card>
    </div>
  );
}
