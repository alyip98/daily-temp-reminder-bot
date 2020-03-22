const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');
// try {
// } catch (e) {
//   console.error(e);
//   console.log("Database not setup");
// }

function getUsers() {
  return new Promise((resolve, reject) =>
    db.all("SELECT * FROM Users", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    }));
}

function addUser(telegramid) {
  return new Promise((resolve, reject) => {
    const stmt = db.run("INSERT INTO Users VALUES (?)", [telegramid], err => {
      if (err) {
        err.errno === 19 ? reject("User already exists") : reject("Unknown error");
      }
      resolve();
    });
  });
}

function removeUser(telegramid) {
  return new Promise((resolve, reject) => {
    const stmt = db.run("DELETE FROM Users WHERE telegramid=(?)", [telegramid], err => {
      if (err) {
        console.error("Failed to remove user", err);
        reject("Something went wrong while trying to perform this action");
      }
      resolve();
    });
  });
}

function getLastUpdate() {
  return new Promise((resolve, reject) =>
    db.all("SELECT * FROM Metadata WHERE id=1 ORDER BY timestamp DESC LIMIT 1", (err, rows) => {
      if (err) {
        reject({timestamp: 0});
      } else {
        resolve(rows[0]);
      }
    }));
}

function setUpdate(timestamp = Date.now()) {
  return new Promise((resolve, reject) => {
    const stmt = db.run("UPDATE Metadata SET timestamp=(?) WHERE id=1", [timestamp], err => {
      if (err) {
        console.error("Failed to add update", err);
      }
      resolve();
    });
  });
}


module.exports = { getUsers, addUser, removeUser , setUpdate, getLastUpdate };
