const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Summary, Advertisment } = require('../models/models')
const {validationResult} = require ('express-validator')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {
            id: id, email, role
        },
        process.env.SECRET_KEY,
        { expiresIn: '48h' }
    )
}

class UserController {
    async registration(req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return next(ApiError.badRequest('Ошибка валидации'))
        }

        const { email, password, role } = req.body

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            return next(ApiError.badRequest('Пользовтель с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword })
        const token = generateJwt(user.id, email, user.role)
        return res.json({token})

    }
    async login(req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return next(ApiError.badRequest('Ошибка авторизации'))
        }
        
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
       const token = generateJwt (req.user.id, req.user.email, req.user.role)
       return res.json({token})
    }

    async checkUserSummary(req, res, next) {
        const { id } = req.params
        const userSummary = await Summary.findOne(
            { where: { userId: id } }
        )
        return res.json(userSummary)
     }

     async checkUserAdvertisement(req, res, next) {
        const { id } = req.params
        const userAdvertisment = await Advertisment.findAll(
            { where: { userId: id } }
        )
        return res.json(userAdvertisment)
     }
}

module.exports = new UserController()

