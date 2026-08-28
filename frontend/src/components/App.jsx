import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import api from "../utils/api";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");
  const [infoTooltipSuccess, setInfoTooltipSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getUserInfo(token)
        .then((data) => {
          if (data.data) {
            setIsLoggedIn(true);
            setUserEmail(data.data.email);
          }
        })
        .catch((err) => {
          console.error("Token inválido:", err);
          localStorage.removeItem("token");
        });
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData.data || userData);
        setCards(cardData.data || cardData);
      })
      .catch((error) =>
        console.error("Error al cargar datos iniciales:", error),
      );
  }, [isLoggedIn]);

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newUserData) => {
        setCurrentUser(newUserData.data || newUserData);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((newUserData) => {
        setCurrentUser(newUserData.data || newUserData);
      })
      .catch((error) => console.error("Error al actualizar avatar:", error));
  };

  const handleCardLike = (card) => {
    const isLiked =
      card.likes?.some((likeId) => likeId === currentUser._id) || false;

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((updatedCard) => {
        const cardData = updatedCard.data || updatedCard;
        setCards((prevCards) =>
          prevCards.map((c) => (c._id === card._id ? cardData : c)),
        );
      })
      .catch((err) => console.error("Error al dar/quitar like:", err));
  };

  const handleAddCard = (newCardData) => {
    api
      .addCard(newCardData)
      .then((newCard) => {
        const cardData = newCard.data || newCard;
        setCards((prevCards) => [cardData, ...prevCards]);
      })
      .catch((err) => console.error("Error al añadir tarjeta:", err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error("Error al eliminar tarjeta:", err));
  };

  const handleLogin = (email, password) => {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        } else {
          openInfoTooltip(
            "Error al iniciar sesión. No se recibió token.",
            false,
          );
        }
      })
      .catch((err) => {
        console.error("Error en login:", err);
        openInfoTooltip(
          "Error al iniciar sesión. Verifica tus credenciales.",
          false,
        );
      });
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((data) => {
        if (data._id || data.email) {
          openInfoTooltip(
            "¡Registro exitoso! Ahora puedes iniciar sesión.",
            true,
          );
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          openInfoTooltip(
            "Error al registrarse. Intenta con otro email o verifica tus datos.",
            false,
          );
        }
      })
      .catch((err) => {
        console.error("Error al registrarse:", err);
        openInfoTooltip(
          "Error al registrarse. Intenta con otro email o verifica tus datos.",
          false,
        );
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserEmail("");
    navigate("/signin");
  };

  const openInfoTooltip = (message, isSuccess) => {
    setInfoTooltipMessage(message);
    setInfoTooltipSuccess(isSuccess);
    setIsInfoTooltipOpen(true);
  };

  const closeInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                <Header
                  userEmail={null}
                  linkText="Iniciar sesión"
                  linkTo="/signin"
                />
                <Register handleRegister={handleRegister} />
              </>
            }
          />

          <Route
            path="/signin"
            element={
              <>
                <Header
                  userEmail={null}
                  linkText="Regístrate"
                  linkTo="/signup"
                />
                <Login handleLogin={handleLogin} />
              </>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header userEmail={userEmail} onLogout={handleLogout} />
                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddCard={handleAddCard}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeInfoTooltip}
        isSuccess={infoTooltipSuccess}
        message={infoTooltipMessage}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
