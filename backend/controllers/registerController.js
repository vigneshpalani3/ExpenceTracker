const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')


async function handleRegister(req,res){
  const {username,pwd} = req.body
  if(!username || !pwd) return res.status(400).json({"message":"Username And Password Are Required"})

  const allUser = await userModel.find()
  const existingUser = allUser.find(user=>user.username===username)
  if(existingUser) return res.status(400).json({"message":"User Already Exists"})

  const hashedPwd =await bcrypt.hash(pwd,10)
  
  try{
    await userModel.create({
      username,
      password:hashedPwd
    })
    res.status(200).json({"message":"You've Registered Successfully"})
  }catch(err){
    res.status(500).json({"message":err.mssage})
  }
}

async function getUsers(req,res){
  try {
    const data = await userModel.find()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({"message":err.message})
  }
}

module.exports = {
  handleRegister,
  getUsers
}