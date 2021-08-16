const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

router.get("/users/me", getCurrentUser);
router.patch("/users/me", celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateCurrentUser);
