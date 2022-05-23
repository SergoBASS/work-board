const { Summary } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
//const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize');


class SummaryController {
    async create(req, res, next) {
        try {
            let { city, name, surname, birstday, contacts, work_experience, employment_type, title, education, description, cost, userId } = req.body;

            const check = await Summary.findOne(
                { where: { userId } }
            )

            if (!check) {
                if (req.files !== null) {
                    const { avatar } = req.files
                    let filename = uuid.v4() + ".png"
                    avatar.mv(path.resolve(__dirname, '..', 'static', filename))

                    const summary = await Summary.create({ city, name, surname, birstday, contacts, work_experience, employment_type, title, education, description, cost, userId, avatar: filename });
                    return res.json(summary);
                } else {
                    const summary = await Summary.create({ city, name, surname, birstday, contacts, work_experience, employment_type, title, education, description, cost, userId });
                    return res.json(summary);
                }
            } else {
                return next(ApiError.badRequest('Вы уже выложили своюю вакансию'))
            }

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
        let summaries

        if (city !== "ALL_CITIES" && title === '') {
            summaries = await Summary.findAndCountAll({ where: { city }, limit, offset })
        }
        if (city !== "ALL_CITIES" && title !== '') {
            summaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city }, limit, offset })
        }
        if (city === "ALL_CITIES" && title === '') {
            summaries = await Summary.findAndCountAll({ limit, offset })
        }
        if (city === "ALL_CITIES" && title !== '') {
            summaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' } }, limit, offset })
        }
        return res.json(summaries)
    }

    async getFiltered(req, res) {
        let { title, city, limit, page, employment_type, workExperience, education } = req.query
        const Op = Sequelize.Op;
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let filteredSummaries

        let work_experience = false

        if (workExperience === "Есть опыт работы")
            work_experience = true

        const AllEmpty = (employment, experience, education) => {
            if (employment === 'all' && experience === 'all' && education === 'all')
                return true
            else
                return false
        }

        const Employment = (employment, experience, education) => {
            if (employment !== 'all' && experience === 'all' && education === 'all')
                return true
            else
                return false
        }

        const EmploymentExperience = (employment, experience, education) => {
            if (employment !== 'all' && experience !== 'all' && education === 'all')
                return true
            else
                return false
        }

        const EmploymentEducation = (employment, experience, education) => {
            if (employment !== 'all' && experience === 'all' && education !== 'all')
                return true
            else
                return false
        }

        const Experience = (employment, experience, education) => {
            if (employment === 'all' && experience !== 'all' && education === 'all')
                return true
            else
                return false
        }

        const Education = (employment, experience, education) => {
            if (employment === 'all' && experience === 'all' && education !== 'all')
                return true
            else
                return false
        }

        const ExperienceEducation = (employment, experience, education) => {
            if (employment === 'all' && experience !== 'all' && education !== 'all')
                return true
            else
                return false
        }

        const AllFilled = (employment, experience, education) => {
            if (employment !== 'all' && experience !== 'all' && education !== 'all')
                return true
            else
                return false
        }

        if (city !== "ALL_CITIES" && title === '') {
            if (AllEmpty(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { city }, limit, offset })
            else if (Employment(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { city, employment_type }, limit, offset })
            else if (EmploymentExperience(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { city, employment_type, work_experience }, limit, offset })
            else if (EmploymentEducation(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { city, employment_type, education }, limit, offset })
            else if (Experience(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { city, work_experience }, limit, offset })
            else if (Education(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { city, education }, limit, offset })
            else if (ExperienceEducation(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { city, work_experience, education }, limit, offset })
            if (AllFilled(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { city, employment_type, work_experience, education }, limit, offset })
        }
        if (city !== "ALL_CITIES" && title !== '') {
            if (AllEmpty(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city }, limit, offset })
            else if (Employment(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city, employment_type }, limit, offset })
            else if (EmploymentExperience(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city, employment_type, work_experience }, limit, offset })
            else if (EmploymentEducation(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city, employment_type, education }, limit, offset })
            else if (Experience(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city, work_experience }, limit, offset })
            else if (Education(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city, education }, limit, offset })
            else if (ExperienceEducation(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city, work_experience, education }, limit, offset })
            if (AllFilled(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, city, employment_type, work_experience, education }, limit, offset })
        }
        if (city === "ALL_CITIES" && title === '') {
            if (AllEmpty(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ limit, offset })
            else if (Employment(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { employment_type }, limit, offset })
            else if (EmploymentExperience(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { employment_type, work_experience }, limit, offset })
            else if (EmploymentEducation(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { employment_type, education }, limit, offset })
            else if (Experience(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { work_experience }, limit, offset })
            else if (Education(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { education }, limit, offset })
            else if (ExperienceEducation(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { work_experience, education }, limit, offset })
            if (AllFilled(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { employment_type, work_experience, education }, limit, offset })
        }
        if (city === "ALL_CITIES" && title !== '') {
            if (AllEmpty(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' } }, limit, offset })
            else if (Employment(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, employment_type }, limit, offset })
            else if (EmploymentExperience(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, employment_type, work_experience }, limit, offset })
            else if (EmploymentEducation(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, employment_type, education }, limit, offset })
            else if (Experience(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, work_experience }, limit, offset })
            else if (Education(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, education }, limit, offset })
            else if (ExperienceEducation(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, work_experience, education }, limit, offset })
            if (AllFilled(employment_type, workExperience, education))
                filteredSummaries = await Summary.findAndCountAll({ where: { title: { [Op.iLike]: '%' + title + '%' }, employment_type, work_experience, education }, limit, offset })
        }
        return res.json(filteredSummaries)
    }

    async getOne(req, res) {
        const { id } = req.params
        const summary = await Summary.findOne(
            { where: { id } }
        )
        return res.json(summary)
    }

    async getUserSummary(req, res) {
        const { id } = req.params
        const summary = await Summary.findOne(
            { where: { userId: id } }
        )
        if (summary)
            return res.json(summary)
        else
            return res.json({ message: 'Ничего не найдено' })
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const summary = await Summary.findOne(
                { where: { id } }
            )
            if (summary.avatar != null) {
                fs.unlink(path.resolve(__dirname, '..', 'static', summary.avatar), function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Файл удалён");
                    }
                });
            }

            await Summary.destroy(
                { where: { id } }
            )
            return res.json({ message: 'Резюме удалено' })
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            let { city, name, surname, birstday, contacts, work_experience, employment_type, title, education, description, cost } = req.body

            const oldSummary = await Summary.findOne(
                { where: { id } }
            )

            if (req.files !== null) {
                const { avatar } = req.files
                let filename = uuid.v4() + ".png"

                avatar.mv(path.resolve(__dirname, '..', 'static', filename))

                if (oldSummary.avatar != null) {
                    fs.unlink(path.resolve(__dirname, '..', 'static', oldSummary.avatar), function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Файл удалён");
                        }
                    });
                }

                await Summary.update(
                    { city, name, surname, birstday, contacts, work_experience, employment_type, title, education, description, cost, avatar: filename },
                    { where: { id } }
                )
            } else {
                if (oldSummary.avatar != null) {
                    const nullAvatar = oldSummary.avatar
                    await Summary.update(
                        { city, name, surname, birstday, contacts, work_experience, employment_type, title, education, description, cost, nullAvatar },
                        { where: { id } }
                    )
                } else {
                    await Summary.update(
                        { city, name, surname, birstday, contacts, work_experience, employment_type, title, education, description, cost },
                        { where: { id } }
                    )
                }
            }
            return res.json({ message: 'Вакансия обновлена' })
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new SummaryController()