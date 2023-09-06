import Joi = require("joi");

export const userSchema = Joi.object().keys({
        username : Joi.string().min(6).max(20).required(),
        full_name : Joi.string().min(6).max(50).required(),
        profile_picture : Joi.string(),
        profile_description : Joi.string(),
        email : Joi.string().email().min(6).max(20).required(),
        password : Joi.string().min(8).max(20).required(),
})
