class FavoritesService {
    constructor() {
        this.favoriteCities = require("../../data/favorite-cities");
    }

    addCity(city) {
        this.favoriteCities.push(city);
    }

    removeCity(city) {
        this.favoriteCities.splice(this.favoriteCities.indexOf(city), 1);
    }

    getCities() {
        return this.favoriteCities;
    }

    hasCity(city) {
        return this.favoriteCities.includes(city);
    }

    clear() {
        
    }

}

module.exports = FavoritesService;