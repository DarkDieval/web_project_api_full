import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked =
    card.likes?.some((likeId) => likeId === currentUser?._id) || false;

  const isOwn = currentUser && card.owner === currentUser._id;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike(card);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onCardDelete(card);
  };

  return (
    <li className="places__card">
      <img
        className="places__card-image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="places__card-info">
        <h2 className="places__card-title">{card.name}</h2>
        <button
          className={`places__card-like-button ${
            isLiked ? "places__card-like-button_active" : ""
          }`}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
      {isOwn && (
        <button
          className="places__card-delete-button"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
    </li>
  );
}

export default Card;
