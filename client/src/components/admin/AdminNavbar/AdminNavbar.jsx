import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../../contexts/AdminContext";
import { adminLogout } from "../../../utils/adminApi";
import { ProfileModal } from "./ProfileModal";
import { MobileMenu } from "./MobileMenu";
import { NavItem } from "./NavItem";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useContext(AdminContext);

  const [isOpen, setIsOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const handleToggleMenu = () => setIsOpen(!isOpen);
  const handleProfileModal = () => setProfileModal(!profileModal);

  const handleSignOut = async () => {
    try {
      const res = await adminLogout();
      if (res.success) {
        setIsAdminLoggedIn(false);
        alert(res.message);
        setProfileModal(false);
        setIsOpen(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleNavigate = (path) => {
    setProfileModal(false);
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="w-full z-50 shadow">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="logo cursor-pointer"
          onClick={() => handleNavigate("/")}
        >
          HFM
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-5">
          <NavItem
            label="Assign Meal"
            onClick={() => handleNavigate("/assign-meal")}
            style="hover:border-b border-black"
          />
          <NavItem
            label="+ Patient"
            onClick={() => handleNavigate("/add-patient")}
            style="hover:border-b border-black"
          />
          <NavItem
            label="+ Pantry Staff"
            onClick={() => handleNavigate("/add-pantry-staff")}
            style="hover:border-b border-black"
          />
          <NavItem
            label="+ Rider"
            onClick={() => handleNavigate("/add-rider")}
            style="hover:border-b border-black"
          />
          <div
            className="relative pl-5 cursor-pointer"
            onClick={handleProfileModal}
          >
            <FaGear />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden" onClick={handleToggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {/* Profile Modal */}
      {profileModal && (
        <ProfileModal onNavigate={handleNavigate} onSignOut={handleSignOut} />
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <MobileMenu onNavigate={handleNavigate} onSignOut={handleSignOut} />
      )}
    </nav>
  );
};

export default AdminNavbar;
