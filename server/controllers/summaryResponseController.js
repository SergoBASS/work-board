const { SummaryResponse, Advertisment, AdvertismentResponse, User, Summary } = require('../models/models');
const ApiError = require('../error/ApiError');

class SummaryResponseController {
    async create(req, res, next) {
        try {
            let { userId, summaryId } = req.body

            const responseCheck = await SummaryResponse.findAll(
                { where: { userId, summaryId } }
            )

            if (responseCheck.length !== 0) {
                return next(ApiError.badRequest('Вы уже откликнулись на эту вакансию'))
            }

            const summaryResponse = await SummaryResponse.create({ userId, summaryId });
            return res.json(summaryResponse);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res) {
        const summaryResponse = await SummaryResponse.findAll()
        return res.json(summaryResponse)
    }

    async getOne(req, res) {
        let { userId, summaryId } = req.body
        const response = await SummaryResponse.findOne(
            { where: { userId, summaryId } }
        )
        return res.json(response)
    }

    async getUserResponses(req, res) {
        let { userId } = req.body
        const userResponses = await SummaryResponse.findAll(
            { where: { userId } }
        )
        return res.json(userResponses)
    }

    async delete(req, res) {
        let { userId, summaryId } = req.body
        const userResponse = await SummaryResponse.destroy(
            { where: { userId, summaryId } }
        )
        return res.json({ message: 'Отклик удален' })
    }

    async getUserResponders(req, res) {
        const { id } = req.params
        let respondersArr = new Array()
        let advertisementsId = new Array()
        const userAdvertisements = await Advertisment.findAll({ where: { userId: id } })

        if(!userAdvertisements){
            return res.json({ message: "Ничего не найдено" })
        }

        userAdvertisements.map(advertisements => {
            advertisementsId.push(advertisements.id)
        });

        for (let i = 0; i < advertisementsId.length; i++) {
            const findSummaryResponders = await AdvertismentResponse.findAll({ where: { advertismentId: advertisementsId[i] } })
            findSummaryResponders.map(summatyResponders => {
                respondersArr.push(summatyResponders.userId)
            })
        }
        if (respondersArr.length !== 0) {
            let responders = new Array()
            let uniqueTespondersResponse = respondersArr.filter(function (item, pos) {
                return respondersArr.indexOf(item) == pos;
            })
            for (let i = 0; i < uniqueTespondersResponse.length; i++) {
                const responderInfo = await User.findOne({ where: { id: uniqueTespondersResponse[i] } })
                responders.push({ id: responderInfo.id, email: responderInfo.email })
            }
            return res.json(responders)
        } else {
            return res.json({ message: "Ничего не найдено" })
        }
    }

    async getResponderedSummary(req, res) {
        const { id } = req.params

        const response = await User.findOne({
            where: { id },
            include: {
                through: SummaryResponse,
                model: Summary,
                required: true
            }
        })

        if (response)
            return res.json(response.summaries)
        else
            return res.json({ message: "Ничего не найдено" })
    }
}

module.exports = new SummaryResponseController()