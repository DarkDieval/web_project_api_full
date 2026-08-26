import { useState, useContext } from "react";
import { CurrentUserContext } from "@/contexts/CurrentUserContext";

export default function EditProfile({ onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || "");
  const [about, setAbout] = useState(currentUser?.about || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, about });
    onClose();
  };

  return (
    <form
      className="popup__content"
      name="profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__content" style={{ border: "none" }}>
        <input
          className="popup__input"
          id="profile-name"
          placeholder="Nombre"
          required
          type="text"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="popup__input"
          id="profile-about"
          placeholder="Acerca de mí"
          required
          type="text"
          minLength="2"
          maxLength="200"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <button className="popup__button popup__button_save" type="submit">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}
