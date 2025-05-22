import { PenTool, Code, Users, FlaskConical } from 'lucide-react';

const PopularCourses = () => {
  const courses = [
    { icon: <PenTool className="text-[var(--color-kuning)] w-6 h-6" />, title: 'Graphic Design' },
    { icon: <Code className="text-[var(--color-biru)] w-6 h-6" />, title: 'Programming' },
    { icon: <Users className="text-[var(--color-hijau)] w-6 h-6" />, title: 'Soft Skill' },
    { icon: <FlaskConical className="text-purple-500 w-6 h-6" />, title: 'Science' },
  ];

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-extrabold text-[var(--color-teks)] font-[var(--font-poppins-extrabold)]">Popular This Week</h3>
        <a href="#" className="text-sm text-[var(--color-hijau)] hover:underline font-medium">View all</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {courses.map((item, idx) => (
          <div
            key={idx}
            className="bg-white px-4 py-3 rounded-xl flex items-center space-x-4 shadow-sm hover:shadow-md transition duration-200"
          >
            <div className="p-3 bg-[var(--color-latar)] rounded-full">
              {item.icon}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[var(--color-teks)]">{item.title}</h4>
              <p className="text-xs text-[var(--color-teks-samping)]">Lorem ipsum dolor sit amet</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <a href="#" className="text-sm text-[var(--color-hijau)] hover:underline font-medium">View all</a>
      </div>
    </div>
  );
};

export default PopularCourses;
