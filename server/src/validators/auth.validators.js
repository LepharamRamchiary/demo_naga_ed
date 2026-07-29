import { body, param } from "express-validator";

const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("address")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage("Address must be under 255 characters"),
];

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

const userIdParamValidator = [
  param("id")
    .notEmpty()
    .withMessage("User id is required")
    .isUUID()
    .withMessage("User id must be a valid UUID"),
];

export { registerValidator, loginValidator, userIdParamValidator };
