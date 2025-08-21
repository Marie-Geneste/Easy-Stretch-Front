// ForgotPassword.jsx
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import logoES from '../../assets/img/favicon.png'
import axios from 'axios';
import './styles.scss';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur');
    }
  };

  return (
    <div className="AuthPage">
      <div className="box">
        <img className="logo" alt="logo" src={logoES} />
        <h2>Mot de passe oublié</h2>
        <p className="sub">Saisissez votre email pour recevoir un lien de réinitialisation.</p>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="ex: utilisateur@mail.com"
                 value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="actions">
            <NavLink to="/login">
                <button className="btn ghost" type="button">
                    Annuler
                </button>
            </NavLink>
            <button className="btn primary" type="submit">Envoyer</button>
          </div>
          {message.text && <div className={`msg ${message.type}`}>{message.text}</div>}
        </form>
      </div>
    </div>
  );
}
