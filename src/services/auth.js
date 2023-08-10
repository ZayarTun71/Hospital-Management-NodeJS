const User = require("../../models").user;
const bcrypt = require("bcrypt");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/accessToken");

exports.loginUser = async (userData) => {
  const { password, email } = userData;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw { code: 404, message: "User not found" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw { code: 404, message: "User not found" };
  }

  const authToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  return { id: user.id, email: user.email, authToken: authToken ,refreshToken: refreshToken};
};
