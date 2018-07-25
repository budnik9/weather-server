const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
    city: String,
});

const Favorites = mongoose.model("Favorites", favoritesSchema);

module.exports = Favorites;
