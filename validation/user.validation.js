import Joi from "joi"

export const loginSchema = (data) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().trim().required(),
        password: Joi.string().alphanum().trim().required(),
    }).required();

    return schema.validate(data)
}

export const signupSchema = (data) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(4).trim().required(),
        password: Joi.string().alphanum().min(8).trim().required(),
    }).required();

    return schema.validate(data)
}