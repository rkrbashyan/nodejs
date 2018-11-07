const Product = require("../models/product")

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  })
}

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body

  Product.create({ title, imageUrl, description, price }).then(_ =>
    res.redirect("/")
  )
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit

  if (!editMode) {
    res.redirect("/")
  }

  const productId = req.params.productId

  Product.findById(productId).then(product => {
    if (!product) {
      return res.redirect("/")
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: !!editMode,
      product
    })
  })
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products =>
      res.render("admin/products", {
        products,
        pageTitle: "Admin products",
        path: "/admin/products"
      })
    )
    .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, description, price } = req.body
  Product.update(
    { title, imageUrl, description, price },
    { where: { id } }
  ).then(_ => res.redirect("/admin/products"))
}

exports.postDeleteProduct = (req, res, next) => {
  const { id } = req.body
  Product.destroy({ where: { id } }).then(_ => res.redirect("/admin/products"))
}
