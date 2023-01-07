"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var newJWT = function (user) {
    return jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, "secret", {
        expiresIn: "1d",
    });
};
exports.default = newJWT;
