const express = require("express");
const bodyParser = require("body-parser");

const database = require("../database/database");
const requestBody = require("../middleware/request-body");

const addRouter = express.Router();
addRouter.use(bodyParser.json());

addRouter.get("/", requestBody.check, (_req, res, _next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send({ status: "Success", count: database.count() });
});

module.exports = addRouter;
