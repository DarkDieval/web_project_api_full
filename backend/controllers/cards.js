const Card = require("../models/card");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de usuario inválido"));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("Tarjeta no encontrada");
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de tarjeta inválido"));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError("Tarjeta no encontrada");
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de tarjeta inválido"));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError("Tarjeta no encontrada");
    })
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw new ForbiddenError(
          "No tienes permisos para eliminar esta tarjeta",
        );
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then((card) =>
      res.send({ message: "Tarjeta eliminada correctamente", data: card }),
    )
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de tarjeta inválido"));
      }
      next(err);
    });
};
