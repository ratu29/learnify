import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import PageHeader from "../components/PageHeader";
import PopularCourses from "../components/PopularCourses";
import CourseCard from "../components/CourseCard";

// Dummy image link bisa kamu ganti ke file lokal
const dummyCourses = [
  {
    img: "https://i.pinimg.com/474x/97/81/ad/9781adda88d913bffc312bdf894240a0.jpg",
    title: "Fullstack Developer",
    author: "Ratu Oktaviana"
  },
  {
    img: "https://i.pinimg.com/736x/85/c3/59/85c359894a2c859c99afcfaf558d4d75.jpg",
    title: "UI Design Beginner",
    author: "Sania Glory"
  },
  {
    img: "https://i.pinimg.com/736x/9a/5a/a3/9a5aa3635335d2576f0bc3ead3d9db82.jpg",
    title: "How to be Freelancer",
    author: "Jack Williy"
  },
  {
    img: "https://i.pinimg.com/736x/a7/7e/e0/a77ee0479390813dc41be88019f3794d.jpg",
    title: "UX Research",
    author: "Hanna chya"
  },
  {
    img: "https://i.pinimg.com/736x/c4/2c/42/c42c426735e7ff64ed1bdb6f87e368e4.jpg",
    title: "Basic Web Design",
    author: "Johnny andre"
  },
  {
    img: "https://i.pinimg.com/736x/ac/fc/8b/acfc8b59c0e2527e20a7928a2819352b.jpg",
    title: "3D Character Design",
    author: "Jordan peter"
  },
];

const Dashboard = () => {
  return (
    <div className="flex font-[var(--font-poppins)] bg-[var(--color-latar)]">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <PageHeader title="All Courses" breadcrumb="Home / Courses" />
        
        {/* Popular Courses */}
        <PopularCourses />

        {/* All Courses Grid */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-[var(--color-teks)]">All Courses</h3>
            <a href="#" className="text-sm text-[var(--color-hijau)] hover:underline">View all</a>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {dummyCourses.map((course, idx) => (
              <CourseCard key={idx} img={course.img} title={course.title} author={course.author} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
