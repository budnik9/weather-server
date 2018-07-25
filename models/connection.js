const mongoose = require("mongoose");
const config = require("../config/mongo-config");

const connection = mongoose
    .connect(`mongodb://${config.HOST}/${config.DATA_BASE_NAME}`)
    .then(connection => {
        console.log(`The connection to the database "${config.DATA_BASE_NAME}" was successful`);

        return connection;
    });

module.exports = connection;
