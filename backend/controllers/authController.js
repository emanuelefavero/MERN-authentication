const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err
    if (!user) res.send('No User Exists')
    else {
      req.logIn(user, (err) => {
        if (err) throw err
        res.send('Successfully Authenticated')
        // console.log(req.user)
      })
    }
  })(req, res, next)
}
exports.register = (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err
    if (doc) res.send('User Already Exists')
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      })
      await newUser.save()
      res.send('User Created')
    }
  })
  // console.log(req.body)
}

// Logout - destroys the session
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.send('User Logged out')
  })
}

exports.user = (req, res) => {
  res.send(req.user)
  // TIP: Once authenticated, the user is stored in the req.user object, which contains all the session data. This can be used and called at absolutely any time, anywhere in the application, even if the user refreshes the page.
}
