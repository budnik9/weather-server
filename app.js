const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const errorhandler = require("errorhandler");

const appConfig = require("./config/app-config");
const statusCodes = require("./constants/http-status-codes");

const app = express();

require("./models/connection");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "*");

    next();
});

require("./routes")(app);

app.use((req, res, next) => {
    res.status(statusCodes.NOT_FOUND).send("<h1>Page not found</h1>");
});

if (process.env.NODE_ENV === "development") {
    app.use(errorhandler());
}

app.listen(appConfig.PORT, () => {
    console.log(`Server started on port ${appConfig.PORT}`);
});
