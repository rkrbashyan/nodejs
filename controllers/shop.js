const Product = require("../models/product")

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products =>
    res.render("shop/product-list", {
      products,
      pageTitle: "All products",
      path: "/products"
    })
  )
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId

  Product.findById(productId, product =>
    res.render("shop/product-detail", {
      product,
      pageTitle: product.title,
      path: "/products"
    })
  )
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products =>
    res.render("shop/index", {
      products,
      pageTitle: "Shop",
      path: "/"
    })
  )
}

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart"
  })
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
