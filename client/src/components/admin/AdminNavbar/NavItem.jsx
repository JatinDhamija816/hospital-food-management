import PropTypes from "prop-types";

export const NavItem = ({ label, onClick, style = "" }) => {
  return (
    <p className={`font-semibold cursor-pointer ${style}`} onClick={onClick}>
      {label}
    </p>
  );
};

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.string,
};
