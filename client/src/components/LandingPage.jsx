import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <nav className="w-full z-50 shadow">
        <p className="text-xl font-bold text-black p-3">HFM</p>
      </nav>
      <div className="flex flex-col items-center">
        <h1 className="text-center text-2xl font-bold mt-5">
          Hospital Food Manager
        </h1>
        <div className="w-5/6 md:w-1/2">
          <p className="text-center text-lg my-5">
            🚧 Project Under Maintenance: The system is currently live but
            experiencing some issues as bug fixes are in progress. 🚧 A
            streamlined platform designed for hospitals to efficiently manage
            patient diets, meal preparation, and deliveries.
          </p>
        </div>

        <div>
          <div className="bg-blue-500 hover:bg-blue-700 text-white text-center px-6 py-2 my-3 w-full rounded-lg">
            <Link to={"/admin-login"}>
              <button>Sign as Admin</button>
            </Link>
          </div>
          <div className="bg-green-500 hover:bg-green-700 text-white text-center px-6 py-2 my-3 w-full rounded-lg">
            <Link to={"/pantry-staff-login"}>
              <button>Sign as Pantry Staff</button>
            </Link>
          </div>
          <div className="bg-orange-500 hover:bg-orange-700 text-white text-center px-6 py-2 my-3 w-full rounded-lg">
            <Link to={"/rider-login"}>
              <button>Sign as Rider</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
