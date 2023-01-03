"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express = require("express");
var app = express();
app.get("/", function (req, res) {
    res.send("Hello, World!");
});
app.listen(process.env.PORT, function () {
    console.log("Server is listening on port ".concat(process.env.PORT));
});
