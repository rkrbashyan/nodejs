const fs = require("fs")
const path = require("path")

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
)

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        cart = JSON.parse(fileContent)
      }

      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      )
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct

      if (existingProduct) {
        updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 }
        cart.products = [...cart.products]
        cart.products[existingProductIndex] = updatedProduct
      } else {
        updatedProduct = { id, qty: 1 }
        cart.products = [...cart.products, updatedProduct]
      }

      cart.totalPrice += +productPrice

      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err)
      })
    })
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        const cart = JSON.parse(fileContent)
        const deleteItemIndex = cart.products.findIndex(p => p.id === id)

        if (deleteItemIndex !== -1) {
          const deletedItems = cart.products.splice(deleteItemIndex, 1)

          cart.totalPrice -= deletedItems[0].qty * price
        }

        fs.writeFile(p, JSON.stringify(cart), err => {
          console.log(err)
        })
      }
    })
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent)
      if (err) {
        cb(null)
      } else {
        cb(cart)
      }
    })
  }
}
