// ---------------- Imports ----------------
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const authRouter = require('./routes/auth')

const app = express()

// ----------------- Mongoose -----------------
const User = require('./models/user')
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
app.use('/', authRouter)

// ----------- Start Server ------------
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
