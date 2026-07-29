import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  registerUserService,
  loginUserService,
  logoutUserService,
} from "../services/auth.service.js";

const registerUser = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUserService({ email, password });

  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    // maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("accessToken", token, cookieOptions)
    .json(new ApiResponse(200, { user, token }, "Login successful"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await logoutUserService();

  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
