require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const indexRouter = require('./routes/indexRoute');
const usersRouter = require('./routes/usersRoute');
const catalogRouter = require('./routes/catalogRoute');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
}).then(() => {
  console.log('MongoDB connected...')
}).catch((err) => {
  console.log('Error connecting to MongoDB. Error...', err)
  process.exit
})
//routes config
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

//port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))