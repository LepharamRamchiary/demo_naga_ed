import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  getUserByIdService,
  getCurrentUserService,
  getAllUsersService,
} from "../services/user.service.js";

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await getUserByIdService(id);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await getCurrentUserService(req.user);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user fetched successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;

  const result = await getAllUsersService({ page, limit, search });

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Users fetched successfully"));
});

export { getUserById, getCurrentUser, getAllUsers };
