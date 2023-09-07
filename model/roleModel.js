const mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({
    role:{
        type:String,
        default:"user"
    }
})

const Role = mongoose.model('Role',RoleSchema);
module.exports = Role;