require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const routers = require('./router/router')
const cors = require('cors'); 

const app = express()

app.use(cors()); // Allow all origins


app.use(
  cors({
    origin: '*', // 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  })
);



app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json())
app.use((req, res ,next)=>{
    // console.log(req.path, req.method)
    next();
})

app.use('/',routers)

if (!process.env.MONGODB_URL) {
  console.error('MONGODB_URL environment variable is not set!');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

