const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { body } = require('express-validator')

router.post('/registration', body('email').isEmail(), userController.registration)
router.post('/login', body('email').isEmail(), userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/userSummary/:id', userController.checkUserSummary)
router.get('/userAdvertisement/:id', userController.checkUserAdvertisement)

module.exports = router