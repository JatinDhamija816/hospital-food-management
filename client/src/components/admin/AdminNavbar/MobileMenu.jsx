import PropTypes from "prop-types";
import { NavItem } from "./NavItem";

export const MobileMenu = ({ onNavigate, onSignOut }) => (
  <div className="md:hidden px-6 py-4 space-y-4 shadow-lg flex flex-col items-center">
    <NavItem
      label="Assign Meal"
      onClick={() => onNavigate("/assign-meal")}
      style="mobile-profile-modal"
    />
    <NavItem
      label="+ Patient"
      onClick={() => onNavigate("/add-patient")}
      style="mobile-profile-modal"
    />
    <NavItem
      label="+ Pantry Staff"
      onClick={() => onNavigate("/add-pantry-staff")}
      style="mobile-profile-modal"
    />
    <NavItem
      label="+ Rider"
      onClick={() => onNavigate("/add-rider")}
      style="mobile-profile-modal"
    />
    <NavItem
      label="All Patients"
      onClick={() => onNavigate("/all-patients")}
      style="mobile-profile-modal"
    />
    <NavItem
      label="All Pantry Staff"
      onClick={() => onNavigate("/all-pantry-staff")}
      style="mobile-profile-modal"
    />
    <NavItem
      label="All Riders"
      onClick={() => onNavigate("/all-riders")}
      style="mobile-profile-modal"
    />
    <NavItem
      label="Sign Out"
      onClick={onSignOut}
      style="mobile-profile-modal hover:bg-red-500"
    />
  </div>
);

MobileMenu.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
