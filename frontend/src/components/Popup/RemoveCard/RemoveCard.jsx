import Popup from "../Popup";

function RemoveCard({ card, onConfirm, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(card);
  };

  return (
    <Popup onClose={onClose} title="¿Estás seguro?">
      <form
        className="popup__content popup__content_type_confirm"
        onSubmit={handleSubmit}
      >
        <p className="popup__text">
          ¿Estás seguro de que quieres eliminar esta tarjeta?
        </p>
        <p className="popup__text popup__text_sub">
          Esta acción no se puede deshacer.
        </p>
        <button className="popup__button popup__button_save" type="submit">
          Sí, eliminar
        </button>
        <button
          type="button"
          className="popup__button_cancel"
          onClick={onClose}
        >
          Cancelar
        </button>
      </form>
    </Popup>
  );
}

export default RemoveCard;
