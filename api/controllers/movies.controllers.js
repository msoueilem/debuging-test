const mongoose = require("mongoose");

const Movie = mongoose.model(process.env.MOVIES_MODEL);

const _runTitleQuery = function (req, res) {
    const title = req.query.search;
    const query = {
        "title": {$regex: title}
    };
    Movie.find(query).exec(function (err, movies) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: movies
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getAll = function (req, res) {
    if (req.query && req.query.search) {
        _runTitleQuery(req, res);
        return;
    }

    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, 10) ;
    let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10) ;
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({
            "message": "QueryString Offset and Count should be numbers"
        });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({
            "message": "Cannot exceed count of " + maxCount
        });
        return;
    }
    Movie.find().skip(offset).limit(count).exec(function (err, movies) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: movies
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const movieId = req.params.movieId;
    Movie.findById(movieId).exec(function (err, movie) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: movie
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!movie) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

const deleteOne = function (req, res) {
    const movieId = req.params.movieId;
    console.log("Move id", movieId);
    Movie.findByIdAndDelete(movieId).exec(function (err, movie) {
        const response = {
            status: parseInt(process.env.REST_API_DEL_OK, 10),
            message: movie
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!movie) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll,
    getOne,
    deleteOne
};