export default function Alert({ pesan, type }) {
    return type === "kosong" ? (
      <div className="mt-4 p-3 bg-blue-100 border-l-4 border-red-500 text-red-700">
        <p className="font-semibold">{pesan}</p>
      </div>
    ) : (
      <div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
        <p className="font-semibold">{pesan}</p>
      </div>
    );
  }