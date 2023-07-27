const Joi = require("joi");

module.exports.userSchemas = {
  validateCreateRequest: ({body}) => {
    const userRegisterSchema = Joi.object({
      fullname: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.ref("password"),
    });
    return userRegisterSchema.validate(body);
  },
  validateLoginRequest: ({body}) => {
    const userLoginSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      });
    return userLoginSchema.validate(body);
  },
};
