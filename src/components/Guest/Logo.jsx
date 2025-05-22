export default function Logo() {
    return (
      <div id="sidebar-logo" className="flex flex-col">
        <span
          id="logo-title"
          className="font-poppins-extrabold text-[48px] text-black"
        >
          Sedap{" "}
          <b id="logo-dot" className="text-red-600">
            .
          </b>
        </span>
      </div>
    );
  }