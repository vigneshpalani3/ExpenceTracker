const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userModel = require('../models/userModel')

async function handleLogin(req,res){
  const { username,password } = req.body
  // check if username and password exist
  if(!username || !password) return res.status(400).json({"message":"Username And Password Are Required"})
  try{
    const allUsers = await userModel.find()
    const existingUser = allUsers.find(user=>user.username===username)
    if(!existingUser) return res.status(401).json({"message":"User Have Not Registered Yet"})
    // check if password match
    const match =await bcrypt.compare(password,existingUser.password)
    if(!match) return res.status(401).json({"message":"Password Is Incorrect"})
    // create access token
    const accessToken = jwt.sign(
      {userId:existingUser['_id']},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:'30m'}
    )
    // create refresh token
    const refreshToken = jwt.sign(
      {
        userId:existingUser['_id'],
        username
      },
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn:'30d'}
    )
    // send response
    res.status(200).json({accessToken,refreshToken,username})
  }catch(err){
    res.status(500).json({"message":err.message})
  }
}

module.exports = handleLogin