import { useState } from "react";
import InputField from "./components/InputField";
import Alert from "./components/Alert";
import Card from "./components/Card";

export default function HitungGajiForm() {
  const [gaji, setGaji] = useState("");

  const pajak = 0.11;
  const totalGaji = gaji - gaji * pajak;

  return (
    <Card judul="Hitung Gaji Bersih">
      <div className="mb-4">
        <InputField
          label="Gaji Pokok"
          type="number"
          placeholder="Masukkan Gaji Kamu..."
          onChange={(e) => setGaji(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Pajak: <b class="text-red-500">11%</b>
        </label>
      </div>

      {!gaji ? (
        <Alert type="kosong" pesan="Gaji gabole kosong" />
      ) : (
        <Alert
          type="hitung"
          pesan={"Total Take Home (TPH): Rp " + totalGaji.toLocaleString()}
        />
      )}
    </Card>
  );
}
