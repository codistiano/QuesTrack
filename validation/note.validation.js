import Joi from "joi";

export const createNoteSchema = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(150).trim().required(),
    note: Joi.string().min(20).trim().required(),
  }).required()
  
  return schema.validate(data);
};

export const editNoteSchema = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(150).trim().required(),
    note: Joi.string().min(20).trim().required(),
  }).required()
  
  return schema.validate(data);
};