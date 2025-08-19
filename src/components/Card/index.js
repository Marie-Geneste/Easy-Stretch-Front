import { HashLink as Link } from 'react-router-hash-link';
// Styles
import './styles.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const Card = (props) => {
  return (
    <div className="Card" id={props.id}>
      <Link to={`/stretches/${props.link}`} className="card" title={props.title}>
        <div className='card-content'>
          <img src={props.img} alt={props.alt} title={props.hover} />
          <div className="card-footer">
            <h3>{props.title}</h3>
            {props.isLogged ? (
              <span onClick={(e) => { e.preventDefault(); props.onToggleFavorite(); }} className="favorite-icon">
                {props.isFavorite ? <AiFillHeart className='filled-icon' /> : <AiOutlineHeart />}
              </span>
            ) : (
              <span className="favorite-icon" />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};


export default Card;
