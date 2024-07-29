const userModel = require("../models/userModel")

async function deleteUser(req,res){
  try{
    if(!req.userId) return res.status(401).json({"message":"user id is required"})
    const existingUser =await userModel.findOne({_id:req.userId})
    if(!existingUser) return res.status(403).message({"message":"given user dosen't match with the database"})
    await userModel.findOneAndDelete({_id:req.userId})
    res.status(200).json({"message":"user deleted successfully"})
  }catch(err){
    res.sendStatus(500)
  }
}

module.exports=deleteUser