const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // TIP: Since we use bcrypt the password will be already long so there is no need to add a minlength here (note: it is always a good idea to add a minlength to the password field IN THE FRONTEND)
})

module.exports = mongoose.model('User', UserSchema)
