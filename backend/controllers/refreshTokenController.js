const jwt = require('jsonwebtoken')
require('dotenv').config()

function handleRefreshToken(req,res){

  const {refreshToken} = req.params

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err,decoded)=>{
      if(err) return res.sendStatus(403)
      const {userId,username} = decoded
      const accessToken = jwt.sign(
        {userId},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'30m'}
      )
      res.json({accessToken,refreshToken,username})
    }
  )
}

module.exports={
  handleRefreshToken
}