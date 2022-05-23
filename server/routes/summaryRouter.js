const Router = require('express')
const router = new Router()
const SummaryController = require('../controllers/summaryController')
const checkRole = require('../middleware/checkRoleMiddleware')
const checkAuth = require('../middleware/checkAuthMiddleware')

router.post('/', checkRole('WORKER'), SummaryController.create)
router.get('/', SummaryController.getAll)
router.get('/filter', SummaryController.getFiltered)
router.get('/:id', SummaryController.getOne)
router.get('/userSummary/:id', SummaryController.getUserSummary)
router.delete('/:id', checkRole('WORKER'), checkAuth("SUMMARY"), SummaryController.delete)
router.put('/:id', checkRole('WORKER'), checkAuth("SUMMARY"), SummaryController.update)
module.exports = router