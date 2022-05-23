const Router = require('express')
const router = new Router()
const AdvertisementResponseController = require('../controllers/advertisementResponseController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('WORKER'), AdvertisementResponseController.create)
router.post('/userResponses', checkRole('WORKER'), AdvertisementResponseController.getUserResponses)
router.get('/', checkRole('WORKER'), AdvertisementResponseController.getAll)
router.get('/userResponders/:id', checkRole('WORKER'),  AdvertisementResponseController.getUserResponders)
router.get('/userRespondersAdvertisements/:id', checkRole('WORKER'),  AdvertisementResponseController.getResponderedAdvertisement)
router.post('/deleteUserResponse', checkRole('WORKER'), AdvertisementResponseController.delete)
router.post('/getone', checkRole('WORKER'), AdvertisementResponseController.getOne)

module.exports = router