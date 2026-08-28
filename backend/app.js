const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const {
  validateCreateUser,
  validateLogin,
} = require("./middlewares/validation");

const { PORT = 3000 } = process.env;
const app = express();

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("✅ Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
  });

app.use(express.json());
app.use(requestLogger);

const allowedCors = [
  "https://www.around.mooo.com",
  "http://www.around.mooo.com",
  "https://api.around.mooo.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    const requestHeaders = req.headers["access-control-request-headers"];
    if (requestHeaders) {
      res.header("Access-Control-Allow-Headers", requestHeaders);
    }
    return res.end();
  }

  next();
});

app.post("/signup", validateCreateUser, createUser);
app.post("/signin", validateLogin, login);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Recurso no encontrado" });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Error interno del servidor" : message,
  });
});

module.exports = app;
