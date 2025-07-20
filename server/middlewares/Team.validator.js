import { body, validationResult } from "express-validator";

export const validateCreateTeam = [
  body("name")
    .trim()
    .notEmpty().withMessage("Team name is required.")
    .isString().withMessage("Team name must be a string."),

  // Middleware to check validation result
    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];



export const validateUpdateTeam=[
    body("name")
    .trim()
    .notEmpty().withMessage("Team name is required.")
    .isString().withMessage("Team name must be a string."),

     // Middleware to check validation result
     (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
] 
