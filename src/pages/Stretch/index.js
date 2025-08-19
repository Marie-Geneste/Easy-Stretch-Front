import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { AiOutlineHeart, AiFillHeart, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
// Styles
import './styles.scss'
import StretchForm from "../../components/StretchForm";

const Stretch = ({isLogged, isAdmin}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [stretch, setStretch] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const token = localStorage.getItem('token');
    const authCfg = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/stretches/${id}`)
            .then(response => {
                setStretch(response.data)
            })
    }, [id]);

    useEffect(() => {
        if (!isLogged || !token) {
        setIsFavorite(false);
        return;
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/me/stretches/`, authCfg)
        .then(res => {
            const listFav = Array.isArray(res.data) ? res.data : [];
            const found = listFav.some(s => Number(s.id) === Number(id));
            setIsFavorite(found);
        })
        .catch(err => {
            console.error("GET favorites failed:", err);
        });
    }, [id, isLogged, token]);

    const handleFavorite = async (event) => {
        event.preventDefault();

        if (!isLogged || !token) return;

        const next = !isFavorite;
        setIsFavorite(next);

        try {
        if (next) {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/user/me/stretches/${id}`, {}, authCfg);
        } else {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/user/me/stretches/${id}`, authCfg);
        }
        } catch (err) {
            console.error("Toggle favorite failed:", err);
            setIsFavorite(!next);
        }
    };
    const handleDelete = () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          axios.delete(`${process.env.REACT_APP_BASE_URL}/stretches/${id}`, config)
          .then(response => {
            navigate("/stretches")
          })
          .catch(error => {
            console.log(error);
          });
    }
    const handleEdit = () => {
        setOnEdit(!onEdit);
    }

    return (
        <div className="Stretch">
            <div className="stretch-container">
                <div className="stretch-image-container">
                    <img 
                        src={stretch.main_image}
                        alt={stretch.name}
                        title={stretch.name}
                        className="stretch-image"
                    />
                {isLogged ? (
                <span onClick={handleFavorite} className="fav-icon">
                { isFavorite ? <AiFillHeart className='filled-icon' /> : <AiOutlineHeart />}
                </span>) : null
                }

                </div>
                {onEdit ? 
                <StretchForm stretch={stretch} setStretch={setStretch} id={id} setOnEdit={setOnEdit}/> : 
                (<div className="stretch-infos">
                    <h1>{stretch.name}</h1>
                    <p>{stretch.description}</p>
                    {isAdmin ? (
                                <div className="icon-box">
                                <AiOutlineEdit onClick={handleEdit} />
                                <AiOutlineDelete onClick={handleDelete} />
                                </div>
                ) : null }
                </div> )}
            </div>
        </div>
    )
}

export default Stretch;
