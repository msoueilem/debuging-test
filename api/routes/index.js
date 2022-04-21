const express= require("express");

const router= express.Router();
const moviesController= require("../controllers/movies.controllers");

router.route("/movies")
        .get(moviesController.getAll);

router.route("/movie/:movieId")
        .get(moviesController.getOne)
        .delete(moviesController.deleteOne);

module.exports= router;