const User = require("../model/userModel")

//pagination logic
const getPagination = async(resultPerPage,pageno,projection)=>{

    // skip the rows on the basis of page
    const skip = (pageno-1)*resultPerPage
    const users=await User.find({},projection)
    .skip(skip)
    .limit(resultPerPage)

    return users;
}

module.exports = getPagination