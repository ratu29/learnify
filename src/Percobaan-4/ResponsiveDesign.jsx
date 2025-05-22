export default function ResponsiveDesign() {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-10">
        <ResponsiveText />
        <ResponsiveWidth />
        <ResponsiveLayout />
      </div>
    );
  
    function ResponsiveText() {
      return (
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">📏 Responsive Text</h2>
          <p className="text-sm md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-gray-700">
            Coba lakukan <strong>zoom in</strong> atau <strong>zoom out</strong>. Perhatikan bahwa ukuran teks akan menyesuaikan dengan ukuran layar.
            <br />
            <br />
            Hapus class dengan breakpoint (seperti <code>md:</code>, <code>lg:</code>) dan lihat bagaimana tampilannya berubah!
          </p>
        </div>
      );
    }
  
    function ResponsiveWidth() {
      return (
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-4 text-green-700">📐 Responsive Flex Width</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Dua kolom di bawah ini akan menyesuaikan ukuran layar:
          </p>
          <ul className="list-disc ml-6 text-sm text-gray-600 mb-4">
            <li><strong>md:w-1/2</strong> → Kolom jadi 50% lebar di tablet ke atas</li>
            <li><strong>md:flex-row</strong> → Baris horizontal di layar medium (≥768px)</li>
            <li><strong>default: flex-col</strong> → Tersusun vertikal di mobile</li>
          </ul>
  
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-red-400 text-white text-center rounded-lg p-6 shadow">📦 Kolom 1</div>
            <div className="bg-blue-400 text-white text-center rounded-lg p-6 shadow">📦 Kolom 2</div>
          </div>
        </div>
      );
    }
  
    function ResponsiveLayout() {
      return (
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">🔲 Responsive Grid Layout</h2>
          <p className="text-gray-700 mb-2 leading-relaxed">
            Grid di bawah ini berubah sesuai ukuran layar:
          </p>
          <ul className="list-disc ml-6 text-sm text-gray-600 mb-4">
            <li><strong>grid-cols-1</strong> → 1 kolom (mobile)</li>
            <li><strong>sm:grid-cols-2</strong> → 2 kolom (≥640px)</li>
            <li><strong>md:grid-cols-3</strong> → 3 kolom (≥768px)</li>
            <li><strong>lg:grid-cols-4</strong> → 4 kolom (≥1024px)</li>
          </ul>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-purple-500 text-white rounded-xl p-6 text-center font-semibold shadow hover:scale-105 transition"
              >
                🧱 Box {n}
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
  