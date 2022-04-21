const mongoose= require("mongoose");

const movieSchema= mongoose.Schema({
    genres: [String],
    runtime: Number,
    cast: [String],
    title: String,
    fullplot: String,
    language: [String],
    release: Date,
    year: Number,
});

mongoose.model(process.env.MOVIES_MODEL, movieSchema, process.env.DB_MOVIES_COLLECTION)