export default function Popup({ onClose, title, children }) {
  return (
    <div className="popup active">
      <div
        className={`popup__container ${!title ? "popup__container_image" : ""}`}
      >
        <button className="popup__button_close" type="button" onClick={onClose}>
          ✕
        </button>
        {title && <h3 className="popup__subtitle">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
