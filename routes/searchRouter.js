const express = require("express");
const bodyParser = require("body-parser");

const database = require("../database/database");
const requestBody = require("../middleware/request-body");

const addRouter = express.Router();
addRouter.use(bodyParser.json());

addRouter.get("/", requestBody.check, (req, res, _next) => {
  const query = req.query.name;
  const results = database.searchContact(query);

  if (results.length !== 0) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send({ status: "Success", contacts: results, count: results.length });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.send({ status: "No Contacts Found" });
  }
});

module.exports = addRouter;
