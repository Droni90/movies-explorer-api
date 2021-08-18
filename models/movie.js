const mongoose = require("mongoose");
const { isURL } = require("validator");

const cardSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 80,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: "Неккоректный url адрес",
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: "Неккоректный url адрес",
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: "Неккоректный url адрес",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model("card", cardSchema);
