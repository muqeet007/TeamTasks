import { body, validationResult } from "express-validator";

export const validateUserDetails = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required.")
    .isString().withMessage("Name must be a string."),
  
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Invalid email format."),

  // Middleware to check validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  
];
