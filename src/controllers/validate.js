const Joi = require('@hapi/joi');

const createRoomValidate = data => {
  const schema = Joi.object({
    _id: Joi.number().required().min(6),
    password: Joi.string().required().min(6).max(200)
  });

  return schema.validate(data);
}

const createAQuestionValidate = data => {
  const schema = Joi.object({
    title: Joi.string().required(),
    room: Joi.number().required()
  });

  return schema.validate(data);
}

const enterRoomValidate = data => {
  const schema = Joi.object({
    url: Joi.number()
  });

  return schema.validate(data);
}

module.exports = { createRoomValidate, createAQuestionValidate, enterRoomValidate }