const { Sequelize } = require('sequelize')
require("dotenv").config()
const { Database_URL } = process.env

const sequelize = new Sequelize(
    Database_URL,
    {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)

module.exports = sequelize