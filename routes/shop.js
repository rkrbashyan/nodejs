const path = require("path");
const express = require("express");
const rootDir = require("../utils/path");
const products = require("./admin").products;

const router = express.Router();

router.get("/", (req, res, next) => {
  //res.sendFile(path.join(rootDir, "views", "shop.html"));

  res.render("shop", {
    products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0
  });
});

module.exports = router;
