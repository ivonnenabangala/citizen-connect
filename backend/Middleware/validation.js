import Joi from 'joi';

const addUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .max(100)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$"))
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit.",
    })
    .required(),
  role: Joi.string().valid("user", "admin", "govtOfficial").default("user"),
});

const updateUserRoleSchema = Joi.object({
  role: Joi.string().valid("user", "admin", "govtOfficial").default("user"),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .max(100)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$"))
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit.",
    })
    .required(),
});

const voteSchema = Joi.object({
  vote: Joi.string().valid("yes", "no").required(),
});

export { addUserSchema, loginSchema, voteSchema };
