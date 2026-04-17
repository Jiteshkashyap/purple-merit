import Joi from 'joi'

export const userUpdateSchema = Joi.object({
        name:Joi.string().min(3).max(30),
        password:Joi.string().min(6).optional().allow('')
    })
