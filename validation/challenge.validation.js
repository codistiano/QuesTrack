import Joi from "joi";

export const challengeSchema = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(100).trim().required(),
        description: Joi.string().min(5).max(150).trim().required(),
        challengeType: Joi.string().valid('30','60','100').required()
    }).required();

    return schema.validate(data)
}