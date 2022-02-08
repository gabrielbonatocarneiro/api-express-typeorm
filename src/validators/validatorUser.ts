import { body } from "express-validator";

const validatorCreateUser = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name must contain any valid value"),

  body("email")
    .isEmail()
    .withMessage("email must contain a valid email address"),

  body("password")
    .isLength({ min: 4 })
    .withMessage("password must be at least 4 characters long"),
];

const validatorUpdateUser = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name must contain any valid value"),

  body("email")
    .isEmail()
    .withMessage("email must contain a valid email address"),

  body("oldPassword")
    .if(body("newPassword").exists())
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("old password must be at least 4 characters long"),

  body("newPassword")
    .if(body("oldPassword").exists())
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("new password must be at least 4 characters long"),
];

export { validatorCreateUser, validatorUpdateUser };
