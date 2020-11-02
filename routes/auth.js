const router = require('express').Router();
const Joi = require('joi');
const User = require('../model/User');

const schema =  Joi.object().keys({
    name : Joi.string().alphanum().min(6).required(),
    email : Joi.string().min(6).required().email(),
    password : Joi.string().min(6).required(),
});

router.get('/all', async (req,res)=>{
    res.send("Welcome to the GET Method");
});

router.post('/register', async (req,res)=>{
    
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

       // validate request body against schema
       const { error, value } = schema.validate(user, options);
    
       if (error) {
           res.send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
       } else {
        const savedUser = await user.save();
        res.send(savedUser);
       }

});

module.exports = router;