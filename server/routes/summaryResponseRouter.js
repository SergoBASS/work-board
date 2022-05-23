const Router = require('express')
const router = new Router()
const SummaryResponseController = require('../controllers/summaryResponseController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('EMPLOYER'), SummaryResponseController.create)
router.post('/userResponses', checkRole('EMPLOYER'), SummaryResponseController.getUserResponses)
router.get('/', checkRole('EMPLOYER'), SummaryResponseController.getAll)
router.get('/userResponders/:id', checkRole('EMPLOYER'), SummaryResponseController.getUserResponders)
router.get('/userRespondersSummary/:id', checkRole('EMPLOYER'), SummaryResponseController.getResponderedSummary)
router.post('/deleteUserResponse', checkRole('EMPLOYER'), SummaryResponseController.delete)
router.post('/getone', checkRole('EMPLOYER'), SummaryResponseController.getOne)

module.exports = router