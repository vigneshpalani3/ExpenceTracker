const express = require('express')
const app = express()
const cors = require('cors')
const { connectDB } = require('./db/db')
const {verifyJWT} = require('./middlewares/verifyJWT')
const cookieParser = require('cookie-parser')
const incomes = require('./routes/income')
const user = require('./routes/user')
const expenses = require('./routes/expense') 
const PORT = process.env.PORT || 3000
require('dotenv').config()

app.use(cors({
  origin:'https://expencetracker-frontend.onrender.com',
  credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

connectDB()

app.use('/user',user)

app.use(verifyJWT)
app.use('/incomes',incomes)
app.use('/expenses',expenses)


app.listen(PORT,console.log('server is running on port '+PORT))
