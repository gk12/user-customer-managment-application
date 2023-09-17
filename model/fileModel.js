const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({

    filename:{
        type:String
    },
    originalname:{
       type:String
    },
    size:{
       type:Number
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    
})

const File = mongoose.model('File',FileSchema)
module.exports = File