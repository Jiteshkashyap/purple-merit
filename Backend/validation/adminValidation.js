import Joi from 'joi'

export const createUserSchema = Joi.object({
        name:Joi.string().min(3).max(30).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required(),
        role:Joi.string().valid('admin','user', 'manager').default('user'),
        status: Joi.string().valid("active", "inactive").required()
    })

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6).optional().allow(""),
  role: Joi.string().valid("admin", "manager", "user").optional(),
  status: Joi.string().valid("active", "inactive").optional()
});
