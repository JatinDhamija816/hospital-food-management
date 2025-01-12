import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full z-50 shadow">
      <div className="px-6 py-4 flex items-center justify-center space-x-4">
        <Link to={"/admin-login"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Sign as Admin
          </button>
        </Link>
        <Link to={"/pantry-staff-login"}>
          <button className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            Sign as Pantry Staff
          </button>
        </Link>
        <Link to={"/rider-login"}>
          <button className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-2 rounded-lg">
            Sign as Rider
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
