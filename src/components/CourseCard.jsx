const CourseCard = ({ img, title, author }) => {
    return (
      <div className="bg-red rounded-xl shadow-sm p-3">
        <img src={img} alt={title} className="w-full h-36 object-cover rounded-lg mb-3" />
        <h4 className="text-[var(--color-teks)] font-medium">{title}</h4>
        <p className="text-sm text-[var(--color-teks-samping)] mb-2">{author}</p>
        <div className="flex justify-between items-center text-sm font-semibold text-[var(--color-hijau)]">
          <span>$50.99</span>
          <a href="#" className="text-xs underline">View Details</a>
        </div>
        <p className="text-xs text-[var(--color-teks-samping)] mt-1">110+ Content</p>
      </div>
    );
  };
  
  export default CourseCard;
  