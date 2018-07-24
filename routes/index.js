const favorites = require("./favorites");

module.exports = app => {
    app.use("/favorites", favorites);
};
