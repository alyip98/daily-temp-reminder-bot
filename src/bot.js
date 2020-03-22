const Telegraf = require('telegraf');
const session = require('telegraf/session');
const equal = require('fast-deep-equal');
const moment = require('moment');
const promiseRetry = require('promise-retry');

const db = require('./db');

const TICK_INTERVAL = 5000;
const REMINDER_TIMES = "0900 1500".split(" ");

const WELCOME_MESSAGE = "Successfully registered. You will receive a reminder daily at <b>9 am</b> and <b>3 pm</b> to record your temperature. Type /stop if you wish to stop receiving reminders.";
const REMINDER_MESSAGE = "Remember to record your temperature";
const STOP_MESSAGE = "Successfully unregistered";

module.exports = token => {
  const bot = new Telegraf(token);
  let users = [];
  updateUsers();
  setInterval(intervalHandler, TICK_INTERVAL);

  bot.use(session());

  bot.start(ctx => {
    if (ctx.chat.type === "private" || ctx.chat.type === "group") {
      db.addUser(ctx.chat.id)
        .then(() => ctx.reply(WELCOME_MESSAGE, { parse_mode: "HTML" }))
        .catch((err) => { ctx.reply(WELCOME_MESSAGE, { parse_mode: "HTML" }) });
    } else {
      console.log(ctx);
    }
  });

  bot.command("stop", ctx => {
    if (ctx.chat.type === "private" || ctx.chat.type === "group") {
      db.removeUser(ctx.chat.id)
        .then(() => ctx.reply(STOP_MESSAGE))
        .catch((err) => ctx.reply(err));
    } else {
      console.log(ctx);
    }
  });

  bot.help((ctx) => ctx.reply('Hello!'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));

  function intervalHandler() {
    updateUsers();
    db.getLastUpdate().then(({timestamp}) => {
      const lastUpdate = moment(timestamp);
      const currentTime = moment();
      REMINDER_TIMES.forEach(reminderTime => {
        const hours = parseInt(reminderTime.slice(0, 2));
        const mins = parseInt(reminderTime.slice(2));
        const reminderTarget = lastUpdate.clone().startOf('day').hour(hours).minute(mins);
        if (lastUpdate < reminderTarget && reminderTarget < currentTime) {
          return messageBlast(REMINDER_MESSAGE);
        }
        return Promise.resolve();
      });

      db.setUpdate(currentTime.valueOf());
    });

  }

  function messageBlast(message) {
    console.log(`[${new Date().toLocaleTimeString()}]`,"Blasting message", message);
    return Promise.all(users.map(user => {
      retryMessage(user.telegramid, `${message}`);
    })).then(() => {
      console.log(`[${new Date().toLocaleTimeString()}]`,"Finished blasting message", message);
    });
  }

  function retryMessage(chatid, message) {
    // Tries sending the message if failed up to 10 times
    return promiseRetry((retry, number) => {
      return bot.telegram.sendMessage(chatid, message)
          .catch(retry);
      }, {
      retries: 10,
      factor: 2,
      minTimeout: 1000,
    })
      .catch(err => console.log("Max tries exceeded for", chatid, message));
  }

  function updateUsers() {
    return db.getUsers().then(_users => {
      if (!equal(users, _users)) {
        console.log("Updated users");
        users = _users;
      }
    });
  }

  return bot.launch().then(() => console.log("Bot launched successfully")).catch(console.error);
};


