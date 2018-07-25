const statusCodes = require("../../constants/http-status-codes");

const sendWithOk = (res, data = null, message = "") => {
    return res.status(statusCodes.OK).json({
        data,
        message,
    });
};

const sendWithBadRequest = (res, data = null, message = "") => {
    return res.status(statusCodes.BAD_REQUEST).json({
        data,
        message,
    });
};

const sendWithServerError = (res, data = null, message = "") => {
    return res.status(statusCodes.SERVER_ERROR).json({
        data,
        message,
    });
};

module.exports = {
    sendWithOk,
    sendWithBadRequest,
    sendWithServerError
};
