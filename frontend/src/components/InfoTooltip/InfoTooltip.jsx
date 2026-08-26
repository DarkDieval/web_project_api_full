import { useEffect } from "react";
import successIcon from "../../images/success-icon.png";
import errorIcon from "../../images/error-icon.png";
import "./InfoTooltip.css";

const InfoTooltip = ({ isOpen, onClose, isSuccess, message }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup active" onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button className="popup__button_close" type="button" onClick={onClose}>
          ✕
        </button>
        <div className="popup__info-tooltip">
          <img
            className="popup__info-icon"
            src={isSuccess ? successIcon : errorIcon}
            alt={isSuccess ? "Éxito" : "Error"}
          />
          <p className="popup__info-message">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
