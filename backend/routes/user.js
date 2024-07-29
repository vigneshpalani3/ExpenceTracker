const router = require('express').Router()
const { handleRegister,getUsers } = require('../controllers/registerController')
const handleLogin  = require('../controllers/loginController')
const { handleRefreshToken } = require('../controllers/refreshTokenController')
const deleteUser = require('../controllers/deleteUserController')
const { verifyJWT } = require('../middlewares/verifyJWT')

router.get('/',getUsers)

router.post('/register',handleRegister)

router.post('/login',handleLogin)

router.get('/refresh/:refreshToken',handleRefreshToken)

router.delete('/del-user',verifyJWT,deleteUser)

module.exports=router