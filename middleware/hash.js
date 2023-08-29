const bcrypt = require("bcrypt");

// hash password
const hashPassword = async(password) =>
{
  // it will generate random salt for each user
  const salt = await bcrypt.genSalt(5);

  // hash password using bcrypt
  const hashed = await bcrypt.hash(password,salt);
  return hashed;
}

module.exports = hashPassword;