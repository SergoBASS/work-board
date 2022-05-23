const Router = require('express')
const router = new Router()
const advertisementRouter = require('./advertisementRouter') 
const summaryRouter = require('./summaryRouter') 
const userRouter = require('./userRouter') 
const advertisementResponseRouter = require('./advertisementResponseRouter') 
const summaryResponseRouter = require('./summaryResponseRouter')

router.use('/user', userRouter)
router.use('/advertisement', advertisementRouter)
router.use('/summary', summaryRouter)
router.use('/advertisementResponse', advertisementResponseRouter)
router.use('/summaryResponse', summaryResponseRouter)

module.exports = router