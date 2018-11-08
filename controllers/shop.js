const Product = require("../models/product")
const Cart = require("../models/cart")

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products =>
      res.render("shop/product-list", {
        products,
        pageTitle: "All products",
        path: "/products"
      })
    )
    .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId

  Product.findById(productId)
    .then(product => {
      res.render("shop/product-detail", {
        product,
        pageTitle: product.title,
        path: "/products"
      })
    })
    .catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products =>
      res.render("shop/index", {
        products,
        pageTitle: "Shop",
        path: "/"
      })
    )
    .catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart =>
    cart.getProducts().then(products =>
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products
      })
    )
  )
}

exports.postCart = (req, res, next) => {
  const { productId } = req.body
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: productId } })
    })
    .then(products => {
      let product
      if (products.lenght > 0) {
        product = products[0]
      }
      let newQuantity = 1
      if (product) {
        // ...
      }
    })

  res.redirect("/cart")
}

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId, price } = req.body
  Cart.deleteProduct(productId, price)
  res.redirect("/cart")
}

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders"
  })
}

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout"
  })
}
