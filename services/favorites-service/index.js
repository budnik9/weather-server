/**
 *
 */
class FavoritesService {
    /**
     * Return instance of a class
     */
    constructor() {
        this.favoriteCities = require("../../data/favorite-cities");
    }

    /**
     * Add city to favorites.
     * @param {String} city The city
     * @return {void}
     */
    addCity(city) {
        this.favoriteCities.push(city);
    }

    /**
     * Remove city from favorites
     * @param {String} city
     * @return {void}
     */
    removeCity(city) {
        this.favoriteCities.splice(this.favoriteCities.indexOf(city), 1);
    }

    /**
     * Returns all favorite cities
     * @return {Array}
     */
    getCities() {
        return this.favoriteCities;
    }

    /**
     * checks the availability of a city in favorites
     * @param {String} city
     * @return {Boolean}
     */
    hasCity(city) {
        return this.favoriteCities.includes(city);
    }
}

module.exports = FavoritesService;
