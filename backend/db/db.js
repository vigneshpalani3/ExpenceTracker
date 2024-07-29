const mongoose = require('mongoose')

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URl,{dbName:'userData'})
    console.log('db connected')
  }catch(err){
    console.log(err)
  }
}

module.exports={
  connectDB
}