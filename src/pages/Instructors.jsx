
import PageHeader2 from "../components/PageHeader2";
import instructorsData from '../instructorsData.json';

const Instructors = () => {
  return (
    <div className="flex min-h-screen w-full font-[var(--font-poppins)] bg-[var(--color-latar)]">
    

      <div className="flex-1 flex flex-col w-full h-screen overflow-auto">
   
        <PageHeader2 title="Instructors" breadcrumb="Home / Instructors" />

        {/* Instructors Table */}
        <div className="p-4 flex-1">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md">
              <thead>
                <tr className="bg-[var(--color-hijau)] text-white">
                  <th className="text-left py-3 px-4 rounded-tl-xl">Name</th>
                  <th className="text-left py-3 px-4">Rating</th>
                  <th className="text-left py-3 px-4">Reviews</th>
                  <th className="text-left py-3 px-4">Expertise</th>
                  <th className="text-left py-3 px-4">Achievement</th>
                  <th className="text-left py-3 px-4">Certificate</th>
                  <th className="text-left py-3 px-4 rounded-tr-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {instructorsData.map((instructor, index) => (
                  <tr
                    key={instructor.id}
                    className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className="py-3 px-4 font-medium text-[var(--color-teks)]">
                      <div className="flex items-center space-x-3">
                        <img
                          src={instructor.avatar}
                          alt={instructor.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span>{instructor.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{instructor.rating}</td>
                    <td className="py-3 px-4">{instructor.reviews}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {instructor.expertise.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">{instructor.achievement}</td>
                    <td className="py-3 px-4">{instructor.certificate}</td>
                    <td className="py-3 px-4">
                      <button className="bg-[var(--color-hijau)] hover:bg-[var(--color-hijau-gelap)] text-white px-4 py-2 rounded-md text-sm">
                        View Class
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              Showing 1-{instructorsData.length} of {instructorsData.length} instructors
            </span>
            <div className="inline-flex">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l disabled:opacity-50">
                Prev
              </button>
              <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-r">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructors;
