const Sequelize = require("sequelize")
const sequelize = require("../utils/database")

const CardItem = sequelize.define("cardItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  qty: Sequelize.INTEGER
})

module.exports = CardItem
