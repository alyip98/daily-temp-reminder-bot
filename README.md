# Temperature Reminder Bot

## User Guide
Command | Effect
--- | ---
`/start` | Adds you to the reminder list, the bot will remind you to take your temperature twice daily at 9 am and 3 pm
`/stop` | Removes you from the reminder list, preventing you from receiving further reminders

## Quickstart
1. Obtain a `BOT_TOKEN` from [@Botfather](https://telegram.me/BotFather)
1. Create a `.env` file in the project folder:
    ```
    BOT_TOKEN={paste token from @Botfather here}
    ```

1. Run the following

    ```
    npm install
    npm run setupdb
    npm start
    ```

## NPM Scripts
Command | Effect
--- | ---
`npm run start` | Starts the bot
`npm run setupdb` | Creates a database (will overwrite existing db)
`npm run count` | View the number of users on the reminder list

