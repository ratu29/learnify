const PageHeader = ({ title, breadcrumb }) => {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-poppins-extrabold text-[var(--color-teks)]">{title}</h1>
        <p className="text-sm text-[var(--color-teks-samping)]">{breadcrumb}</p>
      </div>
    );
  };
  
  export default PageHeader;
  