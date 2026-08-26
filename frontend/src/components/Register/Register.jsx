import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = ({ handleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password);
  };

  return (
    <div className="register">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      <Link to="/signin">¿Ya tienes cuenta? Inicia sesión</Link>
    </div>
  );
};

export default Register;
