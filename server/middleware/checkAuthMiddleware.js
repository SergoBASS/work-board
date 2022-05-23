const jwt = require('jsonwebtoken')
const { Advertisment } = require('../models/models');
const { Summary } = require('../models/models');

module.exports =  function (adType) {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        console.log(adType)
        const { id } = req.params
        let request={}
        
        if(adType=="ADVERTISEMENT"){
            request = await Advertisment.findOne (
                {where : {id}}
            )
        }else if(adType=="SUMMARY"){
            request = await Summary.findOne(
                { where: { id } }
            )
        }
        else{
            res.status(401).json({ message: "Ошибка URL" })
        }
        
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: "Не авторизован" })
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.id !== request.userId){
                return res.status(401).json({ message: "Нет доступа" })
            }
            req.user = decoded
            next()
        } catch (e) {
            console.log(e)
            res.status(401).json({ message: "Ошибка" })
        }
    }
}