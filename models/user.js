const mongoose = require("mongoose");
const { isEmail, isStrongPassword } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Поле 'name' должно быть заполнено."],
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: [true, "Пользователь с таким 'email' уже существует."],
    required: [true, "Поле 'email' должно быть заполнено."],
    validate: {
      validator: (v) => isEmail(v),
      message: "Некорректный Email",
    },
  },
  password: {
    type: String,
    minlength: [8, "Минимальная длина поля 'password' - 8 символов."],
    required: [true, "Поле 'password' должно быть заполнено."],
    select: false,
    validate: {
      validator(password) {
        return isStrongPassword(password,
          {
            minUppercase: false,
            minSymbols: false,
          });
      },
      message: "Ненадежный пароль",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
