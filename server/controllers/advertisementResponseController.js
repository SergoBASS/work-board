const { AdvertismentResponse, User, SummaryResponse, Summary, Advertisment } = require('../models/models');
const ApiError = require('../error/ApiError');

class AdvertisementResponseController {
    async create(req, res, next) {
        try {
            let { userId, advertismentId } = req.body
            const responseCheck = await AdvertismentResponse.findAll(
                { where: { userId, advertismentId } }
            )

            if (responseCheck.length !== 0) {
                return next(ApiError.badRequest('Вы уже откликнулись на это объявление'))
            }

            const advertisementResponse = await AdvertismentResponse.create({ userId, advertismentId });
            return res.json(advertisementResponse);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res) {
        const advertisementResponse = await AdvertismentResponse.findAll()
        return res.json(advertisementResponse)
    }

    async getOne(req, res) {
        let { userId, advertismentId } = req.body
        const response = await AdvertismentResponse.findOne(
            { where: { userId, advertismentId } }
        )
        return res.json(response)
    }

    async getUserResponses(req, res) {
        let { userId } = req.body
        const userResponses = await AdvertismentResponse.findAll(
            { where: { userId } }
        )
        return res.json(userResponses)
    }

    async delete(req, res) {
        let { userId, advertismentId } = req.body
        const userResponse = await AdvertismentResponse.destroy(
            { where: { userId, advertismentId } }
        )
        return res.json({ message: 'Отклик удален' })
    }

    async getUserResponders(req, res) {
        const { id } = req.params

        const userSummary = await Summary.findOne({ where: { userId: id } })
        if(!userSummary){
            return res.json({ message: "Ничего не найдено" })
        }
        const findSummaryResponders = await SummaryResponse.findAll({ where: { summaryId: userSummary.id } })
        if (findSummaryResponders.length !== 0) {
            let respondersArr = new Array()
            let responders = new Array()
            findSummaryResponders.map(respondersResponse => {
                respondersArr.push(respondersResponse.userId)
            })
            for (let i = 0; i < respondersArr.length; i++) {
                const responderInfo = await User.findOne({ where: { id: respondersArr[i] } })
                responders.push({ id: responderInfo.id, email: responderInfo.email })
            }
            return res.json(responders)
        } else {
            return res.json({ message: "Ничего не найдено" })
        }
    }

    async getResponderedAdvertisement(req, res) {
        const { id } = req.params

        const response = await User.findOne({
            where: { id },
            include: {
                through: AdvertismentResponse,
                model: Advertisment,
                required: true
            }
        })

        if (response)
            return res.json(response.advertisments)
        else
            return res.json({ message: "Ничего не найдено" })
    }
}

module.exports = new AdvertisementResponseController()