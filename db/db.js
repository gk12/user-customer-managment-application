const mongoose=require("mongoose");
const User = require('../model/userModel')
const url ='mongodb://localhost:27017/mydatabase'
async function connectToDatabase() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    
    // i have set index - name unique (if someone wants to add similar name as stored name then they will get error)
    await User.collection.createIndex({ "name": 1 }, { unique: true });
  } catch (error) {
    console.error('Connection error:', error);
  }
}
connectToDatabase();


