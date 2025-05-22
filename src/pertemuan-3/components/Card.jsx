export default function Card({ judul, children }) {
    return (
      <div className="flex flex-col items-center justify-center m-5 p-5 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
            {judul}
          </h2>
          {children}
        </div>
      </div>
    );
  }