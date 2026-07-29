import { Op } from "sequelize";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";

const getUserByIdService = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const getCurrentUserService = async (user) => {
  if (!user) {
    throw new ApiError(401, "Not authenticated");
  }
  return user;
};

const getAllUsersService = async ({ page = 1, limit = 10, search = "" }) => {
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
  const offset = (pageNum - 1) * limitNum;

  const where = search
    ? {
        [Op.or]: [
          { username: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  const { rows, count } = await User.findAndCountAll({
    where,
    attributes: { exclude: ["password"] },
    limit: limitNum,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    users: rows,
    pagination: {
      total: count,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(count / limitNum),
    },
  };
};

export { getUserByIdService, getCurrentUserService, getAllUsersService };