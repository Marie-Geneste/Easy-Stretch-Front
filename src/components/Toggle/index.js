import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Toggle = ({ onLogout, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose(); // ferme le menu si clic en dehors
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleClick = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="menu" ref={menuRef}>
      <NavLink to="/my-space" className="space">
        Mon profil  
      </NavLink>
      <NavLink to="/" className="space" onClick={handleClick}>
        Déconnexion
      </NavLink>
    </div>
  );
};

export default Toggle;
