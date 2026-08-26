import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Card from "../Card/Card";
import Popup from "../Popup/Popup";
import NewCard from "../Popup/forms/NewCard";
import ImagePopup from "../Popup/ImagePopup/ImagePopup";
import RemoveCard from "../Popup/RemoveCard/RemoveCard";
import EditProfile from "../Popup/forms/EditProfile";
import EditAvatar from "../Popup/forms/EditAvatar";

export default function Main({ cards, onCardLike, onCardDelete, onAddCard }) {
  const { currentUser } = useContext(CurrentUserContext);

  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddCard={onAddCard} onClose={handleClosePopup} />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile onClose={handleClosePopup} />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar onClose={handleClosePopup} />,
  };

  function handleOpenPopup(popupConfig) {
    setPopup(popupConfig);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteClick(card) {
    setCardToDelete(card);
  }

  function handleConfirmDelete(card) {
    onCardDelete(card);
    setCardToDelete(null);
  }

  return (
    <main className="main">
      <div className="profile">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={currentUser?.avatar}
            alt="Foto de perfil"
          />
          <div className="profile__image-overlay">
            <button
              className="profile__image-edit-button"
              type="button"
              onClick={() => handleOpenPopup(editAvatarPopup)}
            >
              <span className="profile__image-edit-icon">&#9998;</span>
            </button>
          </div>
        </div>

        <div className="profile__info-container">
          <p className="profile__name">{currentUser?.name}</p>
          <p className="profile__job">{currentUser?.about}</p>
          <button
            className="profile__button profile__button-edit"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          >
            🖋
          </button>
        </div>

        <button
          className="profile__button profile__button-add"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          +
        </button>
      </div>

      <section className="places">
        <ul className="places__grid">
          {Array.isArray(cards) &&
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
                onCardDelete={handleDeleteClick}
              />
            ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}

      {cardToDelete && (
        <RemoveCard
          card={cardToDelete}
          onConfirm={handleConfirmDelete}
          onClose={() => setCardToDelete(null)}
        />
      )}
    </main>
  );
}
