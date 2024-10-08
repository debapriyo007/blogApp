const mongoose = require('mongoose');
require("dotenv").config()

// Connect to MongoDB
const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log('Connected to database!!'); 
    }catch(err){
        console.log(err);
        throw new Error('Error connecting to database!!');
    }
}

module.exports = dbConnection;
