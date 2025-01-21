import PropTypes from "prop-types";

export const ProfileModal = ({ onNavigate, onSignOut }) => (
  <div className="absolute right-5 top-15 bg-white shadow-md shadow-black rounded-lg w-48">
    <ul>
      <li
        className="desktop-profile-modal"
        onClick={() => onNavigate("/all-patients")}
      >
        All Patients
      </li>
      <li
        className="desktop-profile-modal"
        onClick={() => onNavigate("/all-pantry-staff")}
      >
        All Pantry Staff
      </li>
      <li
        className="desktop-profile-modal"
        onClick={() => onNavigate("/all-riders")}
      >
        All Riders
      </li>
      <li
        onClick={onSignOut}
        className="hover:bg-red-500 desktop-profile-modal rounded-b-md"
      >
        Sign Out
      </li>
    </ul>
  </div>
);

ProfileModal.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
