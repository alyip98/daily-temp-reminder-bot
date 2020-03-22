const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

db.each("SELECT COUNT() as count FROM Users", (err, rows) => console.log(rows));
