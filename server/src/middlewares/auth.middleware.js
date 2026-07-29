import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization || "";
  const headerToken = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  const token = req.cookies?.accessToken || headerToken;

  if (!token) {
    throw new ApiError(401, "Access token is missing. Please log in.");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token has expired. Please log in again.");
    }
    throw new ApiError(401, "Invalid access token");
  }

  const user = await User.findByPk(decoded.id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new ApiError(401, "User for this token no longer exists");
  }

  req.user = user;
  next();
});

export { verifyJWT };
