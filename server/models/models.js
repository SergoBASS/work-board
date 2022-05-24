const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "WORKER" }

})

const Advertisment = sequelize.define('advertisment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    city: { type: DataTypes.STRING, allowNull: false },
    company_name: { type: DataTypes.STRING, allowNull: false },
    addres: { type: DataTypes.STRING, allowNull: false },
    contacts: { type: DataTypes.STRING, allowNull: false },
    cost: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    title: { type: DataTypes.TEXT('tiny'), allowNull: false },
    description: { type: DataTypes.TEXT },
    employment_type : { type: DataTypes.TEXT, allowNull: false },
    schedule : { type: DataTypes.TEXT, allowNull: false }
})

const Summary = sequelize.define('summary', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    city: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    birstday: { type: DataTypes.DATEONLY, allowNull: false },
    contacts: { type: DataTypes.STRING, allowNull: false },
    work_experience: { type: DataTypes.BOOLEAN, defaultValue: false },
    employment_type : { type: DataTypes.TEXT, allowNull: false },
    education: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.TEXT('tiny'), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    cost: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true }
})

const AdvertismentResponse = sequelize.define('advertisment_response', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const SummaryResponse = sequelize.define('summary_response', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.hasMany(Advertisment)
Advertisment.belongsTo(User)

User.hasMany(Summary)
Summary.belongsTo(User)

Advertisment.belongsToMany(User, { through: AdvertismentResponse })
User.belongsToMany(Advertisment, { through: AdvertismentResponse })

Summary.belongsToMany(User, { through: SummaryResponse })
User.belongsToMany(Summary, { through: SummaryResponse })

module.exports = {
    User, Advertisment, Summary, AdvertismentResponse, SummaryResponse
}

