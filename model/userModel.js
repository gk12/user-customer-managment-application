const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema ({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role',
        default:"user"
    }

})
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',UserSchema);
module.exports = User;