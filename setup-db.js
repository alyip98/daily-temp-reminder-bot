const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS Users");
  db.run("CREATE TABLE Users (telegramid INT PRIMARY KEY)");

  db.run("DROP TABLE IF EXISTS Metadata");
  db.run("CREATE TABLE Metadata (id INT PRIMARY KEY, timestamp INT)");

  db.run(`INSERT INTO Metadata VALUES (1, ${Date.now()})`);

  console.log("Successfully reset database")
});

db.close();
