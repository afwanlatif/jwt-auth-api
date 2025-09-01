const dotenv = require('dotenv');
dotenv.config();

const { MONGO_URL, PORT, MY_SECRET_KEY, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, PAGINATION_LIMIT } = process.env;

module.exports = {
    mongo_url: MONGO_URL,
    port: PORT,
    my_secret_key: MY_SECRET_KEY,
    access_token_expires_in: ACCESS_TOKEN_EXPIRES_IN,
    refresh_token_expires_in: REFRESH_TOKEN_EXPIRES_IN,
    pagination_limit: PAGINATION_LIMIT
}