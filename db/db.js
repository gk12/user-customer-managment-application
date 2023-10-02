const mongoose=require("mongoose");
const dotenv = require('dotenv')

const User = require('../model/userModel')
// const url ='mongodb://localhost:27017/mydatabase'
const url = process.env.DB;

async function connectToDatabase() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    
    // i have set index - username unique (if someone wants to add similar name as stored name then they will get error)
    await User.collection.createIndex({ "username": 1 }, { unique: true });
  } catch (error) {
    console.error('Connection error:', error);
  }
}
connectToDatabase();


