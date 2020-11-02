const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const User = require('./model/User');

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

const userValidation  =  (req, res) => {
    const schema =  Joi.object().keys({
        name : Joi.string().alphanum().min(6).required(),
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required(),
    });

    const user = new User({
        name: req.body.name,
        email : req.body.email,
        password : req.body.password
    });
    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
       
    const { error, value } = schema.validate(user, options);

    if (error) {
        res.send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        const savedUser = user.save();
        return savedUser;
    }
};

module.exports = { registerValidation,loginValidation, userValidation }


