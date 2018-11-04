const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes); // ROUTES PREFIX
app.use(shopRoutes);

// 404
app.use((req, res, next) => {
  res.render("404", { pageTitle: "Page not found" });
});

app.listen(3000);
