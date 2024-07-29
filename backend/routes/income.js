const router = require('express').Router()
const { getIncomes,addIncome,deleteIncome } = require('../controllers/incomeController')

router.get('/',getIncomes)

router.post('/',addIncome)

router.delete('/:id',deleteIncome)

module.exports = router