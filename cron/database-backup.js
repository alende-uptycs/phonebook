const cron = require("node-cron");
const path = require("path");
const fs = require("fs");

const database = require("../database/database");

const schedule = () => {
  console.log(new Date().toISOString(), "Cron jobs scheduled.");
  cron.schedule("*/5 * * * *", backupDatabase);
};

const backupDatabase = () => {
  fs.writeFile(
    path.join("./", "database", "phonebook.bak"),
    JSON.stringify(database.phonebook),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(new Date().toISOString(), "Database backed up successfully.");
    }
  );
};

module.exports.schedule = schedule;
module.exports.backupDatabase = backupDatabase;
