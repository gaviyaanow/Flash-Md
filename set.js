const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOERTSTlmYjRtdG56V1BRUGRSMENMTDJ2NVdtdGxDaWwzTldNa2xWR25Waz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHZ0N0FxU291eUJ5K1FsMGpLeFlnMFdYcDhmY0tubllhUlZMYnZENlNudz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSkdKeVU0Mk5OTGRZVmcwL1ZMMm9wKzRZUGxvUW42VWo2ZjFNM0wrb1ZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6d1VDSS9yb1VnK0tJOTA0aE45aC8zSmtLM1QrNnJ0L1g0dytYdzJuWHo0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNMaExKWWc5OWFMZXJQUEJOTEZHdEcvVlV4TldWYUxSaUNCck5tZGpJMEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhIcDFlQ1ExV0tuS2FRaU93QStDbUVWbjA3VnRCWStoRFlmakFqcnAyM1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0dxVWNGQWVOaTA5V3BuT25GVU1ycE5iUTRsOG5qU3UyN25GMWt3QnZHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTdLOFVYanZaTWR2Mk82SVZpZE1mSGVZbWo4MGlQWWFkYWtiZTM4aFdDUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxBUVFWdVpBbFAvWDdVcExBc2hENytNcDBVU1ViZGpwOUwvR3pBajZ4WmwyN0Evd2VVYTJ0c0pVQ0ZjNzlFdC80dkV5Nzl6dHBjVW45SzR2ZzZUQ0JnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc3LCJhZHZTZWNyZXRLZXkiOiJuNkdTa1graWlKbWpRSVU2eml5dXQ5MWEvOHc5a0dMUVU0bjJBU09DZUdZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIyR0lEZklOUlRxLWRZOE0tZmNheXpRIiwicGhvbmVJZCI6IjBjZmVhZWJjLWU1MmYtNDEzZS05ZTkwLTk1YzcwMThkNDhlMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYMHcxRU1DeS9RUm5VYkpsRGE5WjVhV2lVdVE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUHEyM3hwei9lOVU4dWVIYTBLVkMwM3RMSnY0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IllXQkFKU0NEIiwibWUiOnsiaWQiOiI5MjMwMjE0MTE5MjM6NTZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQy9SYXhtYW4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ051UzY3b0ZFTGZJc3JvR0dDVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkExR284SmFGQnNSQXFIdVNkOHR6WkZpRnAraW9RYzZDd1BuTWIzUzhMRXM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IngrM1VJK2lHKzRtWFdXSi9aMkZjSTc2V1dpWC9nNUo5L0c0Qjl4MC9UVkdjM2hWN0kyekxBRjdlY29tRDJlZ216RStpTzN0WHBGV2VJOWpnREdtM0RBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJJRU5QYjRsNHFWeVV6OXlVWTlTS21pYThkSG10NkJlRUVGVlQxT2UwK2hITU1Ka2pOcFFvMzBMZXoxWXpQS2o4Y2VtUEJ0SG1YTzZQZlFEQW1GQXREZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzAyMTQxMTkyMzo1NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRTlJxUENXaFFiRVFLaDdrbmZMYzJSWWhhZm9xRUhPZ3NENXpHOTB2Q3hMIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMzMDc2MDM3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUR0eiJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
