import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/instructors";
const API_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc"; // pakai API KEY kamu

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

export default function InstructorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}?id=eq.${id}&limit=1`, { headers }).then((res) => {
      setData(res.data[0]);
    });
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Yakin ingin menghapus instruktur ini?");
    if (confirm) {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      navigate("/instructors");
    }
  };

  if (!data) return <div className="p-4">Memuat detail...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{data.name}</h2>

      {data.profile_image && (
        <img
          src={data.profile_image}
          alt={data.name}
          className="w-32 h-32 object-cover rounded-full mb-4"
        />
      )}

      <p><strong>Rating:</strong> {data.rating}</p>
      <p><strong>Reviews:</strong> {data.reviews}</p>
      <p><strong>Expertise:</strong> {(data.expertise || []).join(", ")}</p>
      <p><strong>Achievement:</strong> {data.achievement}</p>
      <p><strong>Certificate:</strong> {(data.certificate || []).join(", ")}</p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate(`/instructors/form?id=${id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
