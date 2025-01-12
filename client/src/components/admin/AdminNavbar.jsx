import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../contexts/AdminContext";
import { adminLogout } from "../../utils/adminApi";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useContext(AdminContext);

  const [isOpen, setIsOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      const res = await adminLogout();
      if (res.success) {
        setIsAdminLoggedIn(false);
        alert(res.message);
        navigate("/");
        setProfileModal(false);
        setIsOpen(false);
      }
    } catch (error) {
      alert("Something went wrong");
      throw new error();
    }
  };
  return (
    <div>
      <nav className="w-full z-50 shadow">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="logo" onClick={() => navigate("/")}>
            hfm
          </div>

          <div>
            <div className="hidden md:flex items-center space-x-6 cursor-pointer transition">
              <p
                className="font-semibold px-2"
                onClick={() => navigate("/assign-meal")}
              >
                Assign Meal
              </p>

              <p
                className="font-semibold px-2"
                onClick={() => navigate("/add-patient")}
              >
                + Patient
              </p>

              <p
                className="font-semibold px-2"
                onClick={() => navigate("/add-pantry-staff")}
              >
                + Pantry Staff
              </p>
              <p
                className="font-semibold px-2"
                onClick={() => navigate("/add-rider")}
              >
                + Rider
              </p>

              <div
                className="relative pl-5 cursor-pointer"
                onClick={() => setProfileModal(!profileModal)}
              >
                <FaGear />
              </div>
            </div>

            <div className="md:hidden flex">
              <div
                className="md:hidden flex items-center focus:outline-none"
                onClick={handleToggleMenu}
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </div>
            </div>
          </div>
        </div>

        {profileModal && (
          <div className="absolute right-5 top-15 bg-white shadow-md shadow-black rounded-lg w-48">
            <ul>
              <li
                className="desktop-profile-modal"
                onClick={() => {
                  setProfileModal(!profileModal);
                  navigate("/all-patients");
                }}
              >
                All Patients
              </li>
              <li
                className="desktop-profile-modal"
                onClick={() => {
                  setProfileModal(!profileModal);
                  navigate("/all-pantry-staff");
                }}
              >
                All Pantry Staff
              </li>
              <li
                className="desktop-profile-modal"
                onClick={() => {
                  setProfileModal(!profileModal);
                  navigate("/all-riders");
                }}
              >
                All Riders
              </li>
              <li
                onClick={handleSignOut}
                className="hover:bg-red-500 desktop-profile-modal rounded-b-md"
              >
                Sign Out
              </li>
            </ul>
          </div>
        )}

        {isOpen && (
          <div className="md:hidden px-6 py-4 space-y-4 shadow-lg items-center justify-center flex-col">
            <p
              className="mobile-profile-modal"
              onClick={() => {
                navigate("/assign-meal");
                setIsOpen(false);
              }}
            >
              Assign Meal
            </p>
            <p
              className="mobile-profile-modal"
              onClick={() => {
                navigate("/add-patient");
                setIsOpen(false);
              }}
            >
              + Patient
            </p>
            <p
              onClick={() => {
                navigate("/add-pantry-staff");
                setIsOpen(false);
              }}
              className="mobile-profile-modal"
            >
              + Pantry Staff
            </p>
            <p
              onClick={() => {
                navigate("/add-rider");
                setIsOpen(false);
              }}
              className="mobile-profile-modal"
            >
              + Rider
            </p>
            <p
              onClick={() => {
                navigate("/all-patients");
                setIsOpen(false);
              }}
              className="mobile-profile-modal"
            >
              All Pateints
            </p>
            <p
              onClick={() => {
                navigate("/all-pantry-staff");
                setIsOpen(false);
              }}
              className="mobile-profile-modal"
            >
              All Pantry Staff
            </p>
            <p
              onClick={() => {
                navigate("/all-riders");
                setIsOpen(false);
              }}
              className="mobile-profile-modal"
            >
              All Riders
            </p>
            <p
              onClick={handleSignOut}
              className="mobile-profile-modal hover:bg-red-500"
            >
              Sign Out
            </p>
          </div>
        )}
      </nav>
    </div>
  );
};

export default AdminNavbar;
