const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const registerValidation  =  data => {
    const schema = Joi.object( {
        name : Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    });
    validator.query(schema);
    return schema;
};

const loginValidation = data =>{
    
    const schema =Joi.object( {
        email : Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    });
    validator.query(schema);
    return schema;
};

module.exports = { registerValidation,loginValidation }


