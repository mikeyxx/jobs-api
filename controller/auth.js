const { StatusCodes } = require("http-status-codes");
const { UnauthenticationError, BadRequestError } = require("../errors");
const User = require("../model/user");
const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ user: { name: user.name } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide an email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticationError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticationError("Invalid Credentials");
  }

  const token = user.createJWT(); // Here we are calling the method from the User model
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
