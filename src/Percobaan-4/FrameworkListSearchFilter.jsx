import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(frameworkData.flatMap((framework) => framework.tags))];

  return (
    <div className="p-6">
      {/* Search & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="searchTerm"
          placeholder="🔍 Cari nama atau deskripsi framework..."
          className="p-2 border border-gray-300 rounded w-full"
          onChange={handleChange}
        />

        <select
          name="selectedTag"
          className="p-2 border border-gray-300 rounded w-full"
          onChange={handleChange}
        >
          <option value="">🌐 Semua Tags</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Framework Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFrameworks.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h2>
            <p className="text-gray-600 mb-3">{item.description}</p>

            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Developer:</span> {item.details.developer}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Release Year:</span> {item.details.releaseYear}
            </p>

            <a
              href={item.details.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm block mb-3"
            >
              🌍 Visit Website
            </a>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredFrameworks.length === 0 && (
        <div className="mt-10 text-center text-gray-500">Tidak ditemukan framework yang cocok.</div>
      )}
    </div>
  );
}
