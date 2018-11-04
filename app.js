const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// template engines
// app.set("view engine", "pug");

// const expresHbs = require("express-handlebars");
// app.engine(
//   "handlebars",
//   expresHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout"
//   })
// );
// app.set("view engine", "handlebars");

app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes); // ROUTES PREFIX
app.use(shopRoutes);

// 404
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));

  res.render("404", { pageTitle: "Page not found" });
});

app.listen(3000);

/* const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req)
});

server.listen(3000);
 */
