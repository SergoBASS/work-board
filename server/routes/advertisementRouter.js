const Router = require('express')
const router = new Router()
const AdvertisementController = require('../controllers/advertisementController')
const checkAuth = require('../middleware/checkAuthMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('EMPLOYER'), AdvertisementController.create)
router.get('/', AdvertisementController.getAll)
router.get('/filter', AdvertisementController.getFiltered)
router.get('/:id', AdvertisementController.getOne)
router.get('/userAdvertisements/:id',  AdvertisementController.getUserAdvertisement)
router.post('/userOneAdvertisement',  AdvertisementController.getUserOneAdvertisement)
router.delete('/:id', checkRole('EMPLOYER'), checkAuth("ADVERTISEMENT"), AdvertisementController.delete)
router.put('/:id', checkRole('EMPLOYER'), checkAuth("ADVERTISEMENT"), AdvertisementController.update)

module.exports = router