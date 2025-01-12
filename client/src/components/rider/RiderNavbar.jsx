import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { PantryStaffContext } from "../../contexts/PantryStaffContext";
import { riderLogout } from "../../utils/riderApi";

const RiderNavbar = () => {
  const navigate = useNavigate();
  const { setIsRiderLoggedIn } = useContext(PantryStaffContext);

  const [isOpen, setIsOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      const res = await riderLogout();
      if (res.success) {
        setIsRiderLoggedIn(false);
        alert(res.message);
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
                  navigate("/edit-pantry-staff");
                }}
              >
                Edit Profile
              </li>
              <li
                className="desktop-profile-modal"
                onClick={() => {
                  setProfileModal(!profileModal);
                  navigate("/change-password");
                }}
              >
                Change Password
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
                navigate("/edit-pantry-staff");
                setIsOpen(false);
              }}
            >
              Edit Profile
            </p>
            <p
              className="mobile-profile-modal"
              onClick={() => {
                navigate("/assign-meal");
                setIsOpen(false);
              }}
            >
              Change Password
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

export default RiderNavbar;
