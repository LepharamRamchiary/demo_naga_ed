import { ApiError } from "../utils/ApiError.js";
import { generateToken } from "../utils/generateToken.js";
import User from "../models/user.model.js";

const registerUserService = async ({ username, email, password, address }) => {
  const existingEmail = await User.findOne({
    where: { email: email.toLowerCase().trim() },
  });
  if (existingEmail)
    throw new ApiError(409, "A user with this email already exists");

  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername)
    throw new ApiError(409, "This username is already taken");

  const user = await User.create({ username, email, password, address });
  return user.toSafeObject();
};

const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email: email.toLowerCase().trim() },
  });
  if (!user) throw new ApiError(401, "Invalid email or password");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid email or password");

  const token = generateToken({ id: user.id, email: user.email });
  return { user: user.toSafeObject(), token };
};

const logoutUserService = async () => {
  return true;
};

export { registerUserService, loginUserService, logoutUserService };
