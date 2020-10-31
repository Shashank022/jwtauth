const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const authRoute  = require('./routes/auth');

dotenv.config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true } ,()=>{
    console.log("Sucessfully connected to Mongo DB...!!!");
  });
  
app.use(express.json());

app.use('/api/user', authRoute);

app.get('/', (req, res) => res.send('Welcome Home'));

app.listen(3000, ()=>{ "The Server us up and Runnig on the port 3000"});