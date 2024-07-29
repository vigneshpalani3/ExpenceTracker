const jwt = require('jsonwebtoken')
require('dotenv').config()

async function verifyJWT(req,res,next){
  const authHeader = req.headers['authorization']
  const accessToken = authHeader?.split(' ')[1]
  console.log(accessToken)
  if(!accessToken) return res.sendStatus(401)

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err,decoded)=>{
      if(err) return res.status(401).json({"message":err.message})
      req.userId = decoded.userId
      next()
    }
  )
}

module.exports = {
  verifyJWT
}