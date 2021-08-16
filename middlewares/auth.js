const jwt = require("jsonwebtoken");
const Unauthorized = require("../errors/Unauthorized");

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new Unauthorized("Необходима авторизация"));
  }

  const token = extractBearerToken(authorization);
  let payload;
  const { JWT_SECRET = "dev-key" } = process.env;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Unauthorized("Необходима авторизация"));
  }

  req.user = payload;

  return next();
};
