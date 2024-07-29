const incomeModel = require('../models/incomeModel')

async function getIncomes(req,res){
  
  if(!req.userId) return res.status(400).json({"message":"user id is required"})

  try{
    const incomes = await incomeModel.find({user:req.userId}).sort({createdAt:-1})
    res.status(200).json(incomes)
  }catch(err){
    res.status(500).json({"message":err})
  }
}

async function addIncome(req,res){
  const { title,amount,date,category,description } = req.body

  try{
    const incomeData = await incomeModel.create({
      user:req.userId,
      title,
      amount,
      date,
      category,
      description
    })
    res.status(201).json(incomeData)
  }catch(err){
    res.status(500).json({"message":err.message})
  }
}

async function deleteIncome(req,res){
  const id = req.params.id

  if(!id) return res.status(400).json({"message":"user id is required"})
  try{
    await incomeModel.findByIdAndDelete({"_id":id})
    res.json({"message":"1 income data has been deleted"})
  }catch(err){
    res.status(500).json({"mssage":err.message})
  }
}

module.exports = {
  getIncomes,
  addIncome,
  deleteIncome
}