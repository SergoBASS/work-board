const { Advertisment } = require('../models/models');
const ApiError = require('../error/ApiError');
const Sequelize = require('sequelize');

class AdvertismentController {
    async create(req, res, next) {
        try {
            let { city, company_name, addres, contacts, cost, title, description, employment_type, schedule, userId } = req.body;
            const advertisment = await Advertisment.create({ city, company_name, addres, contacts, cost, title, description, employment_type, schedule, userId });
            return res.json(advertisment);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async getAll(req, res) {
        let { title, city, limit, page } = req.query
        const Op = Sequelize.Op;
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let advertisments
        if (city !== "ALL_CITIES" && title === '')
            advertisments = await Advertisment.findAndCountAll({ where: { city }, limit, offset })
        if (city !== "ALL_CITIES" && title !== '')
            advertisments = await Advertisment.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city }, limit, offset })
        if (city === "ALL_CITIES" && title === '')
            advertisments = await Advertisment.findAndCountAll({ limit, offset })
        if (city === "ALL_CITIES" && title !== '')
            advertisments = await Advertisment.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' } }, limit, offset })

        return res.json(advertisments)
    }
    async getFiltered(req, res) {
        let { title, city, limit, page, employment_type, schedule } = req.query
        const Op = Sequelize.Op;
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let filreredAdvertisments
        console.log(title + " " + city + " " + limit + " " + page + " " + employment_type + " " + schedule + " " + limit)
        if (city !== "ALL_CITIES" && title === '') {
            if (employment_type === 'all' && schedule === 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { city }, limit, offset })
            }
            if (employment_type !== 'all' && schedule === 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { employment_type, city }, limit, offset })
            }
            if (employment_type == 'all' && schedule !== 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { schedule, city }, limit, offset })
            }
            if (employment_type !== 'all' && schedule !== 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { employment_type, schedule, city }, limit, offset })
            }

        }
        if (city !== "ALL_CITIES" && title !== '') {
            if (employment_type === 'all' && schedule === 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city }, limit, offset })
            }
            if (employment_type !== 'all' && schedule === 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city, employment_type }, limit, offset })
            }
            if (employment_type == 'all' && schedule !== 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city, schedule }, limit, offset })
            }
            if (employment_type !== 'all' && schedule !== 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city, employment_type, schedule }, limit, offset })
            }
        }
        if (city === "ALL_CITIES" && title === '') {
            if (employment_type === 'all' && schedule === 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ limit, offset })
            }
            if (employment_type !== 'all' && schedule === 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { employment_type }, limit, offset })
            }
            if (employment_type == 'all' && schedule !== 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { schedule }, limit, offset })
            }
            if (employment_type !== 'all' && schedule !== 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { employment_type, schedule }, limit, offset })
            }
        }
        if (city === "ALL_CITIES" && title !== '') {
            if (employment_type === 'all' && schedule === 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' } }, limit, offset })
            }
            if (employment_type !== 'all' && schedule === 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, employment_type }, limit, offset })
            }
            if (employment_type == 'all' && schedule !== 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, schedule }, limit, offset })
            }
            if (employment_type !== 'all' && schedule !== 'all') {
                filreredAdvertisments = await Advertisment.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, employment_type, schedule }, limit, offset })
            }
        }
        return res.json(filreredAdvertisments)
    }
    async getOne(req, res) {
        const { id } = req.params
        const advertisment = await Advertisment.findOne(
            { where: { id } }
        )
        return res.json(advertisment)
    }
    async getUserAdvertisement(req, res) {
        const { id } = req.params
        const advertisment = await Advertisment.findAll(
            { where: { userId: id } }
        )
        if (advertisment)
            return res.json(advertisment)
        else
            return res.json({ message: 'Ничего не найдено' })
    }

    async getUserOneAdvertisement(req, res) {
        let { id, userId } = req.body;
        const advertisment = await Advertisment.findOne(
            { where: { id, userId } }
        )
        if (advertisment)
            return res.json(advertisment)
        else
            return res.json({ message: 'Ничего не найдено' })
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Advertisment.destroy(
                { where: { id } }
            )
            return res.json({ message: 'Объявление удалено' })
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            let { city, company_name, addres, contacts, cost, title, description, employment_type, schedule } = req.body
            await Advertisment.update(
                { city, company_name, addres, contacts, cost, title, description, employment_type, schedule },
                { where: { id } }
            )
            return res.json({ message: 'Объявление обновлнено' })
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new AdvertismentController()