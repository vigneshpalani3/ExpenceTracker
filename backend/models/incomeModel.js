const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
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
    default:'income',
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

module.exports = mongoose.model('income',incomeSchema)