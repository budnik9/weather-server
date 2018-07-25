const { FavoritesService } = require("../../services");
const { REG_EXP_CITY_NAME } = require("../../constants/reg-exp");
const responseSender = require("../../services/responseSender");

const favoritesService = new FavoritesService();

const transformToCorrectForm = city => {
    const correctCityName = city[0].toUpperCase() + city.slice(1);

    return correctCityName.trim();
};

/**
 * Controller class
 */
class FavoritesController {
    /**
     * Return instance of a class
     */
    constructor() {}

    /**
     * Calls a service function addCity and send response
     * @param {req} req
     * @param {res} res
     * @param {next} next
     */
    async addCity(req, res, next) {
        const { city } = req.body;
        const correctCityName = transformToCorrectForm(city);

        const result = await favoritesService.addCity(correctCityName);

        if (!result) {
            return responseSender.sendWithServerError(
                res,
                null,
                "City was not added",
            );
        }

        responseSender.sendWithOk(
            res,
            correctCityName,
            "City added successfully",
        );
    }

    /**
     * Calls a service function removeCity and send response
     * @param {req} req
     * @param {res} res
     * @param {next} next
     * @return {Object}
     */
    removeCity(req, res, next) {
        const { city } = req.body;
        const correctCityName = transformToCorrectForm(city);

        return favoritesService
            .hasCity(correctCityName)
            .then(async city => {
                const result = await favoritesService.removeCity(
                    correctCityName,
                );

                if (!result) {
                    return responseSender.sendWithServerError(
                        res,
                        null,
                        "Server error",
                    );
                } else {
                    return responseSender.sendWithOk(
                        res,
                        city,
                        "City removed successfully",
                    );
                }
            })
            .catch(() => {
                return responseSender.sendWithBadRequest(
                    res,
                    null,
                    "This city is hasn't in favorites",
                );
            });
    }

    /**
     * Calls a service function getCities and send response
     * @param {req} req
     * @param {res} res
     * @param {next} next
     */
    async getCities(req, res, next) {
        const cities = await favoritesService.getCities();

        if (!cities) {
            return responseSender.sendWithServerError(res);
        }

        responseSender.sendWithOk(res, cities);
    }

    /**
     * Check city name
     * @param {req} req
     * @param {res} res
     * @param {next} next
     * @return {Object}
     */
    async isValid(req, res, next) {
        const { city } = req.body;
        const correctCityName = transformToCorrectForm(city);

        favoritesService
            .hasCity(correctCityName)
            .then(() => {
                return responseSender.sendWithBadRequest(
                    res,
                    null,
                    "This city is has in favorites",
                );
            })
            .catch(() => {
                if (!REG_EXP_CITY_NAME.test(correctCityName)) {
                    return responseSender.sendWithBadRequest(
                        res,
                        null,
                        "invalid city name",
                    );
                }

                next();
            });
    }
}

module.exports = FavoritesController;
