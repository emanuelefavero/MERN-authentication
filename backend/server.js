// ---------------- Imports ----------------
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()

// ----------------- Mongoose -----------------
const User = require('./user')
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to MongoDB')
  }
)

// --------------- Middleware ---------------
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cors({
    origin: 'http://localhost:3000', // <-- location of the react app were connecting to
    credentials: true,
  })
)
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
)
app.use(cookieParser(process.env.SESSION_SECRET_KEY))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)

// ------------- Routes -------------
app.post('/login', (req, res, next) => {
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
})
app.post('/register', (req, res) => {
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
})

// Logout - destroys the session
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.send('User Logged out')
  })
})

app.get('/user', (req, res) => {
  res.send(req.user)
  // TIP: Once authenticated, the user is stored in the req.user object, which contains all the session data. This can be used and called at absolutely any time, anywhere in the application, even if the user refreshes the page.
})

// ----------- Start Server ------------
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
