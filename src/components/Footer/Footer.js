import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './styles.scss';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='Footer'>
            <div className="footer-links">
                <ul>
                    <Link to="/">Accueil</Link>
                    <Link to="/stretches">Étirements</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/login">Connexion</Link>
                </ul>
            </div>

            <div className='footer-text'>
                <p>
                    Tout le monde connaît les étirements mais ils sont trop souvent délaissés malgré leurs effets bénéfiques sur la récupération, la posture et la prévention des blessures.
                </p>
                <p>
                    Easy Stretch a pour but de vous aider à mieux comprendre les étirements et de vous proposer des séances d'étirements adaptées à vos besoins.
                </p>
            </div>

            <div className='footer-socials'>
                <ul>
                    <Link to="/"><FaFacebookF /></Link>
                    <Link to="/"><FaTwitter /></Link>
                    <Link to="/"><FaInstagram /></Link>
                    <Link to="/"><FaYoutube /></Link>
                </ul>
            </div>

            <div className='footer-legal'>
                <p>© 2025 Copyright - Easy Stretch</p>
            </div>
        </div>
    );
};

export default Footer;