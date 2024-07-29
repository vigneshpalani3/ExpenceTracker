const expenseModel = require('../models/expenseModel')

async function getExpenses(req,res){
  
  if(!req.userId) return res.status(400).json({"message":"user id is required"})

  try{
    const expenses = await expenseModel.find({user:req.userId})
    res.status(200).json(expenses)
  }catch(err){
    res.status(500).json({"message":err})
  }
}

async function addExpense(req,res){
  const {title,amount,date,category,description } = req.body

  try{
    const expenseData = await expenseModel.create({
      user:req.userId,
      title,
      amount,
      date,
      category,
      description
    })

    res.status(201).json(expenseData)
  }catch(err){
    res.status(500).json({"message":err.message})
  }
}

async function deleteExpense(req,res){
  const id = req.params.id

  if(!id) return res.status(400).json({"message":"user id is required"})
  try{
    await expenseModel.findByIdAndDelete({"_id":id})
    res.json({"message":"1 expense data has been deleted"})
  }catch(err){
    res.status(500).json({"mssage":err.message})
  }
}

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense
}