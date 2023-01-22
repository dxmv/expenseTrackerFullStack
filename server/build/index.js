"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
require("dotenv").config();
var userRoute_1 = require("./routes/userRoute");
var loginRoute_1 = require("./routes/loginRoute");
var expenseRoute_1 = require("./routes/expenseRoute");
var database_1 = require("./utils/database");
var passport_1 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
var express_1 = __importDefault(require("express"));
var passportConfig_1 = __importDefault(require("./utils/passportConfig"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var app = (0, express_1.default)();
// Connect to database and then start the app
(0, database_1.connect)(function () {
    // Express middleware
    app.use(express_1.default.json());
    app.use((0, express_session_1.default)({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
    }));
    // Passport authorization
    app.use((0, cookie_parser_1.default)());
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    (0, passportConfig_1.default)(passport_1.default);
    app.use("/users/", userRoute_1.router);
    app.use("/expenses/", expenseRoute_1.router);
    app.use("/login", loginRoute_1.router);
    app.listen(8080, function () {
        console.log("Server is listening on port ".concat(process.env.PORT || 8080));
    });
});
