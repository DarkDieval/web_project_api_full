import Popup from "../Popup";

function ImagePopup({ card, onClose }) {
  return (
    <Popup onClose={onClose} title="">
      <div className="popup__container_image">
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </Popup>
  );
}

export default ImagePopup;
