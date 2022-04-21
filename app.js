require("dotenv").config();
require("./api/data/movies-model")
const path= require("path");
const express= require("express");
const routes= require("./api/routes");
require("./api/data/db.js");

const app= express();

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, DELETE');
    next()
});

app.use("/api", routes);

const server= app.listen(process.env.PORT, function() {
    console.log(process.env.MSG_SERVER_START, server.address().port);
});