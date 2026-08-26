import { useRef, useContext } from "react";
import { CurrentUserContext } from "@/contexts/CurrentUserContext";

export default function EditAvatar({ onClose }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const avatar = avatarRef.current.value.trim();
    if (avatar) {
      handleUpdateAvatar({ avatar });
      onClose();
    }
  };

  return (
    <form
      className="popup__content"
      name="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__content">
        <input
          className="popup__input popup__input-avatar"
          id="avatar-link"
          placeholder="Enlace a la imagen de perfil"
          required
          type="url"
          ref={avatarRef}
        />
        <span className="popup__input-error" id="avatar-link-error"></span>
        <button className="popup__button popup__button_save" type="submit">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}
