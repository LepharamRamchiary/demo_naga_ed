import { Router } from "express";
import { registerUser, loginUser,logoutUser, } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validators.js";
import { authLimiter } from "../utils/rateLimit.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(authLimiter, registerValidator, validate, registerUser);

router.route("/login").post(authLimiter, loginValidator, validate, loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

export default router;
