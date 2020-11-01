const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const authRoute  = require('./routes/auth');
const session = require('express-session');
const timeOut = 1000*60*2;

dotenv.config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true } ,()=>{
    console.log("Sucessfully connected to Mongo DB...!!!");
  });
  
app.use(express.json());

app.use(session({
  name:process.env.SESS_NAME,
  resave:false,
  secret:process.env.SESS_SECRET,
  saveUninitialized:false,
  cookie: { 
    maxAge:timeOut ,
    sameSite:true,
    secure: process.env.NODE_ENV,
   }

}));

app.use('/api/user', authRoute);

app.get('/', (req, res) =>{
  console.log("********************************************"); 
  console.log(req.session);
  res.send('Welcome Home')

});

app.get('/login', (req,res)=>{

})

app.get('/register', (req,res)=>{
  
});

app.post('/login', (req,res)=>{

})

app.listen(3000, ()=>
{ console.log("The Server us up and Runnig on the port 3000")});