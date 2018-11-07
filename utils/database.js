const Sequelize = require("sequelize")

const sequelize = new Sequelize("node-complete", "root", "rubenkrbashyan", {
  dialect: "mysql",
  host: "localhost"
})

module.exports = sequelize

/* // create connection pool
const mysql = require("mysql2")
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "rubenkrbashyan"
})

module.exports = pool.promise()
 */
