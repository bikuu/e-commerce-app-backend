const express = require("express");
require("dotenv").config();
require("./config/database");
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(fileUpload());

const auth_route = require("./route/auth");
const product_route = require("./route/product");

app.use("/auth", auth_route);
app.use("/products", product_route);

app.use((req, res) => {
  res.status(404).send({
    msg: "Resrource not found",
  });
});

app.use((err, req, res, next) => {
  let status = 500;
  let msg = "SERVER error";
  let errors = null;

  if (err.name == "ValidationError") {
    status = 400;
    msg = "Bad Request";

    let errors_arr = Object.entries(err.errors);
    let temp = [];

    errors_arr.forEach((el) => {
      let obj = {};
      obj.params = el[0];
      obj.msg = el[1].message;
      temp.push(obj);
    });

    errors = temp;
  }

  res.status(status).send({ msg: msg, errors, error: err.message });
});

app.listen(8000, () => {
  console.log("server started ");
});
