import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoES from '../../assets/img/favicon.png';
import './styles.scss';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (password.length < 8) {
      return setMsg({ type: 'err', text: 'Le mot de passe doit contenir au moins 8 caractères.' });
    }
    if (password !== confirm) {
      return setMsg({ type: 'err', text: 'Les mots de passe ne correspondent pas.' });
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/reset-password`, { token, newPassword: password });
      setMsg({ type: 'ok', text: res.data.message || 'Mot de passe réinitialisé.' });
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setMsg({ type: 'err', text: err.response?.data?.message || 'Lien invalide ou expiré.' });
    }
  };

  return (
    <div className="AuthPage">
      <div className="box">
        <img className="logo" alt="logo" src={logoES} />
        <h2>Réinitialisation du mot de passe</h2>
        <p className="sub">Créez un nouveau mot de passe pour votre compte.</p>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="pw">Nouveau mot de passe</label>
          <input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />

          <label htmlFor="pw2">Confirmez le mot de passe</label>
          <input id="pw2" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} minLength={8} required />

          <div className="actions">
            <button className="btn primary" type="submit">Réinitialiser</button>
          </div>
          {msg.text && <div className={`msg ${msg.type}`}>{msg.text}</div>}
        </form>
      </div>
    </div>
  );
}

