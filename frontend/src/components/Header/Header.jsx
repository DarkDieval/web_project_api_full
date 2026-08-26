import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

function Header({ userEmail, onLogout, linkText, linkTo }) {
  return (
    <header className="header page__section">
      <div className="header__container">
        <img src={logo} alt="Around the U.S. logo" className="header__logo" />
        <div className="header__user-info">
          {userEmail && <span className="header__email">{userEmail}</span>}
          {userEmail ? (
            <button className="header__logout" onClick={onLogout}>
              Cerrar sesión
            </button>
          ) : (
            <Link to={linkTo || "/signin"} className="header__login-link">
              {linkText || "Iniciar sesión"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
