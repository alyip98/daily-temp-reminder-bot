const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../data.db');

db.serialize(function() {
  db.run("DROP TABLE IF EXISTS Users");
  db.run("CREATE TABLE Users (telegramid INT)");
});

db.close();
