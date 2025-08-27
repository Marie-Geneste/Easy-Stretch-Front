// src/components/SuccessPage.jsx
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./styles.scss";

const SuccessPage = ({ message }) => {
  return (
    <div className="success-page">
      <FaCheckCircle className="success-icon" />
      <h2>{message || "Email envoyé avec succès !"}</h2>
      <Link to="/" className="home-button">
        Retour page d'accueil
      </Link>
    </div>
  );
};

export default SuccessPage;
