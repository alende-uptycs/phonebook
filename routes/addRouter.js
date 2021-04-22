const express = require("express");
const bodyParser = require("body-parser");

const database = require("../database/database");
const requestBody = require("../middleware/request-body");

const addRouter = express.Router();
addRouter.use(bodyParser.json());

addRouter.post("/", requestBody.check, (req, res, _next) => {
  database.addContact(req.query.name, req.query.phonenumber);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send({ status: "Success", totalContacts: database.count() });
});

module.exports = addRouter;
