const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")

const errorController = require("./controllers/error")
const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")

const sequelize = require("./utils/database")
const Product = require("./models/product")
const User = require("./models/user")
const Cart = require("./models/cart")
const CartItem = require("./models/cart-item")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
  User.findById(1)
    .then(user => {
      req.user = user
      next()
    })
    .catch(_ => next())
})

app.use("/admin", adminRoutes) // ROUTES PREFIX
app.use(shopRoutes)

// 404
app.use(errorController.get404)

// define relations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

sequelize
  // .sync({ force: true })
  .sync()
  .then(_ =>
    User.upsert({ id: 1, name: "Ruben Krbashyan", email: "ru@ru.com" })
  )
  .then(_ => Cart.upsert({ id: 1, userId: 1 }))
  .then(_ => app.listen(3000))
  .catch(err => console.log(err))
