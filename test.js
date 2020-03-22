const db = require('./src/db');
const moment = require('moment');
//
// db.addUser(123).then(() => console.log("Added user successfully")).catch(console.error);
//
// db.getUsers().then(console.log);
//
// db.removeUser(123).then(() => console.log("Deleted user successfully")).catch(console.error);
//
// db.getUsers().then(console.log);
//
db.getLastUpdate().then(console.log).catch(console.error);
db.setUpdate(123);
db.getLastUpdate().then(console.log).catch(console.error);
db.setUpdate();
db.getLastUpdate().then(console.log).catch(console.error);
//

// REMINDER_TIMES = ["2359"];
// db.getLastUpdate().then(({timestamp}) => {
//   const lastUpdate = moment(timestamp);
//   const currentTime = moment();
//   // console.log(lastUpdate.startOf("day").set('m', 1).format("DD MM YY HH:mm"));
//   REMINDER_TIMES.forEach(reminderTime => {
//     const hours = parseInt(reminderTime.slice(0, 2));
//     const mins = parseInt(reminderTime.slice(2));
//     const reminderTarget = lastUpdate.startOf('day').hour(hours).minute(mins);
//     console.log(reminderTarget.format("DD MM YY HH:mm"));
//     if (lastUpdate < reminderTarget && reminderTarget < currentTime) {
//       console.log(reminderTime);
//       return messageBlast(time);
//     }
//     return Promise.resolve();
//   });
// }).catch(console.error);



