const router = require('express').Router();
const Joi = require('joi');
const User = require('../model/User');
const validation = require('../validation');

router.get('/all', async (req,res)=>{
    res.send("Welcome to the GET Method");
});

router.post('/register', async (req,res)=>{
    const result = await validation.userValidation(req, res);
    res.send(result);
});

module.exports = router;