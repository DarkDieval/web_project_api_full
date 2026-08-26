import { useState } from "react";

export default function NewCard({ onAddCard, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard({ name, link });
    onClose();
  };

  return (
    <form
      className="popup__content"
      name="card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__content">
        <input
          className="popup__input"
          id="card-name"
          placeholder="Título"
          required
          type="text"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__input-error" id="card-name-error"></span>

        <input
          className="popup__input"
          id="card-link"
          placeholder="Enlace a la imagen"
          required
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="popup__input-error" id="card-link-error"></span>

        <button className="popup__button popup__button_save" type="submit">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}
