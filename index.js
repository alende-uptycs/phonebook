/** PROBLEM STATEMENT
 *
 * Create a web app (in go or node.js) to maintain student phone registry. It should listen on port 9876
 *
 * It should support following methods
 * GET /search
 * Parameters: name (student name)
 * Return: student phone number (if found) or error
 *
 * GET /count
 * Parameters: none
 * Return: Number of students in the registry
 *
 * POST /add
 * Parameters: name (student name), phone (phone number)
 * Return: error if student name already exists.
 *
 * Your server should dump your phone registry to the disk every 5 minutes.
 * And when you start/restart, you should first load the phone registry (if it is there) from the disk.
 */

// core modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// user modules
const _ = require("./database/database");
const cron = require("./cron/database-backup");

require("dotenv").config();

// import routes
const searchRouter = require("./routes/searchRouter");
const countRouter = require("./routes/countRouter");
const addRouter = require("./routes/addRouter");

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.use("/add", addRouter);
app.use("/count", countRouter);
app.use("/search", searchRouter);

const port = process.env.PORT || 9876;

app.listen(port, () => {
  console.log(new Date().toISOString(), `Server running on port ${port}`);
  cron.schedule();
});
