const router = require('express').Router();
const Joi = require('joi');
const User = require('../model/User');
const validation = require('../validation');
const user = require('../model/User');

router.get('/', async (req,res)=>{
    try{
        const users = await user.find();
        res.json(users);
    } catch (err){
        res.json({message:err});
    }

})

router.post('/register', async (req,res)=>{
    const result = await validation.userValidation(req, res);
    res.send(result);
});

module.exports = router;