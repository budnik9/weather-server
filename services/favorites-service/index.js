const models = require("../../models");

/**
 *
 */
class FavoritesService {
    /**
     * Return instance of a class
     */
    constructor() {
        this.Favorites = models.Favorites;
    }

    /**
     * Add city to favorites.
     * @param {String} city The city
     * @return {void}
     */
    async addCity(city) {
        const item = new this.Favorites({ city });
        const savedItem = await item.save();

        return savedItem.city;
    }

    /**
     * Remove city from favorites
     * @param {String} city
     * @return {void}
     */
    async removeCity(city) {
        try {
            await this.Favorites.deleteOne({ city });

            return true;
        } catch (err) {
            console.log(err);

            return false;
        }
    }

    /**
     * Returns all favorite cities
     * @return {Array}
     */
    async getCities() {
        const items = await this.Favorites.find().exec();

        return items.map(item => item.city);
    }

    /**
     * checks the availability of a city in favorites
     * @param {String} city
     * @return {Boolean}
     */
    async hasCity(city) {
        const item = await this.Favorites.findOne({ city }).exec();

        return  item ? item.city : Promise.reject(false);
    }
}

module.exports = FavoritesService;
