const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  },
  title:{
    type:String,
    required:true,
  },
  amount:{
    type:Number,
    required:true
  },
  type:{
    type:String,
    default:'expense',
    required:true
  },
  date:{
    type:Date,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  }
},{timestamps:true})

module.exports = mongoose.model('expense',expenseSchema)