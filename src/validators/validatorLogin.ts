import { body } from "express-validator";

const validatorLogin = [
  body("email")
    .isEmail()
    .withMessage("email must contain a valid email address"),

  body("password")
    .isLength({ min: 4 })
    .withMessage("password must be at least 4 characters long"),
];

export { validatorLogin };
