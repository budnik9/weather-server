const express = require("express");
const router = express.Router();

const { FavoritesController } = require("../../controllers");

const favoritesController = new FavoritesController();

router.get("/", favoritesController.getCities);
router.post("/", favoritesController.isValid, favoritesController.addCity);
router.delete("/", favoritesController.removeCity);

module.exports = router;