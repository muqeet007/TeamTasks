import {body,validationResult} from "express-validator"


export const validateTaskDetails=
[
    body("title")
    .trim()
    .notEmpty().withMessage("Task title is required.")
    .isString().withMessage("Task title must be a string."),

  body("description")
    .optional() // Making it optional 
    .trim()
    .isString().withMessage("Description must be a string."),

    body("status")
    .optional()
    .isIn(["pending", "done", "late"]).withMessage("Invalid status value."),

    body("status")
    .optional()
    .isIn(["pending", "done", "late"]).withMessage("Invalid status value."),

  body("assignedTo")
    .optional()
    .isMongoId().withMessage("Assigned user ID must be valid."),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
]