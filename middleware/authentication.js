const jwt = require("jsonwebtoken");
const { UnauthenticationError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticationError("Authentication, Error");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticationError("Authentication Error");
  }
};

module.exports = auth;
