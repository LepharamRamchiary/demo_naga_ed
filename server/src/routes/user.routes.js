import { Router } from "express";
import {
  getUserById,
  getCurrentUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { userIdParamValidator } from "../validators/auth.validators.js";

const router = Router();

router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/").get(verifyJWT, getAllUsers);

router
  .route("/:id")
  .get(verifyJWT, userIdParamValidator, validate, getUserById);

export default router;
