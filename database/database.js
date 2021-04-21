const fs = require("fs");
const path = require("path");
const PhonebookModel = require("./models/phonebookModel");

class Database {
  static instance = null;
  phonebook = [];

  constructor() {
    console.log(new Date().toISOString(), "Database connected.");
    this.createPhonebook();
  }

  static getInstance() {
    if (this.instance === null) this.instance = new Database();
    return this.instance;
  }

  createPhonebook() {
    fs.readFile(
      path.join(".", "database", "phonebook.bak"),
      { encoding: "utf8" },
      (err, data) => {
        if (err)
          if (err.code === "ENOENT") {
            console.log(
              new Date().toISOString(),
              "No database backup found on file system."
            );
            this.phonebook = [];
          } else throw new Error(err);
        else {
          console.log(
            new Date().toISOString(),
            "Found database backup. Loading database from filesystem. "
          );
          this.phonebook = JSON.parse(data);
        }
      }
    );
  }

  addContact(name, phonenumber) {
    this.phonebook = [...this.phonebook, new PhonebookModel(name, phonenumber)];
  }

  searchContact = (name) =>
    this.phonebook.filter((contact) => {
      return contact.name.toLowerCase().includes(name.toLowerCase());
    });

  count = () => this.phonebook.length;
}

module.exports = Database.getInstance();
