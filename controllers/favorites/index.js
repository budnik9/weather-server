const { FavoritesService } = require("../../services");
const statusCodes = require("../../constants/http-status-codes");
const { REG_EXP_CITY_NAME } = require("../../constants/reg-exp");

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
    addCity(req, res, next) {
        const { city } = req.body;
        const correctCityName = transformToCorrectForm(city);

        favoritesService.addCity(correctCityName);

        res.status(statusCodes.OK).json({
            message: "city added successfully",
            error: null,
            data: correctCityName,
        });
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

        if (!favoritesService.hasCity(correctCityName)) {
            return res.status(statusCodes.BAD_REQUEST).json({
                message: "This city is hasn't in favorites",
                error: "bad request",
                data: null,
            });
        }

        favoritesService.removeCity(correctCityName);

        res.status(statusCodes.BAD_REQUEST).json({
            message: "City removed successfully",
            error: null,
            data: city,
        });
    }

    /**
     * Calls a service function getCities and send response
     * @param {req} req 
     * @param {res} res 
     * @param {next} next 
     */
    getCities(req, res, next) {
        const cities = favoritesService.getCities();

        res.status(statusCodes.OK).json({
            message: "",
            error: null,
            data: cities,
        });
    }

    /**
     * Check city name
     * @param {req} req 
     * @param {res} res 
     * @param {next} next
     * @return {Object} 
     */
    isValid(req, res, next) {
        const { city } = req.body;
        const correctCityName = transformToCorrectForm(city);

        if (favoritesService.hasCity(correctCityName)) {
            return res.status(statusCodes.BAD_REQUEST).json({
                message: "This city is has in favorites",
                error: "bad request",
                data: null,
            });
        }

        if (!REG_EXP_CITY_NAME.test(correctCityName)) {
            return res.status(statusCodes.BAD_REQUEST).json({
                message: "invalid city name",
                error: "invalid city name",
                data: null,
            });
        }

        next();
    }
}

module.exports = FavoritesController;
