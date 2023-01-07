"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isAdmin = function (req, res, next) {
    var user = req.user;
    if (user.username === "Dima") {
        next();
    }
    next(Error("Unauthorized"));
};
exports.default = isAdmin;
