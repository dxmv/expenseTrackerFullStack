"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var database_1 = require("../utils/database");
var passport_1 = __importDefault(require("passport"));
var expenseController_1 = __importDefault(require("../controllers/expenseController"));
var Expense_1 = __importDefault(require("../models/Expense"));
exports.router = express_1.default.Router();
// Get all expenses for a user
exports.router.get("/", passport_1.default.authenticate("jwt", { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, db, expenses, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                db = (0, database_1.getDb)().collection("expenses");
                return [4 /*yield*/, expenseController_1.default.getAll(db, user._id)];
            case 1:
                expenses = _a.sent();
                res.json({
                    success: true,
                    data: __assign({}, expenses),
                });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Add a new expense for a user
exports.router.post("/", passport_1.default.authenticate("jwt", { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, db, _a, title, description, year, month, date, price, today, expense, e_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                user = req.user;
                db = (0, database_1.getDb)().collection("expenses");
                _a = req.body, title = _a.title, description = _a.description, year = _a.year, month = _a.month, date = _a.date, price = _a.price;
                if (!year || !month || !date) {
                    today = new Date();
                    _b = [
                        today.getFullYear(),
                        today.getMonth() + 1,
                        today.getDate(),
                    ], year = _b[0], month = _b[1], date = _b[2];
                }
                return [4 /*yield*/, expenseController_1.default.create(db, new Expense_1.default(user._id, title, description, price, year, month, date))];
            case 1:
                expense = _c.sent();
                res.json({
                    success: true,
                    data: __assign({}, expense),
                });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _c.sent();
                console.log(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Edit an expense
exports.router.put("/:expenseId", passport_1.default.authenticate("jwt", { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, db, _a, title, description, price, expense, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                user = req.user;
                db = (0, database_1.getDb)().collection("expenses");
                _a = req.body, title = _a.title, description = _a.description, price = _a.price;
                return [4 /*yield*/, expenseController_1.default.update(db, user._id, req.params.expenseId, { title: title, description: description, price: price })];
            case 1:
                expense = _b.sent();
                res.json({
                    success: true,
                    data: __assign({}, expense),
                });
                return [3 /*break*/, 3];
            case 2:
                e_3 = _b.sent();
                console.log(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete an expense
exports.router.delete("/:expenseId", passport_1.default.authenticate("jwt", { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, db, result, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                db = (0, database_1.getDb)().collection("expenses");
                return [4 /*yield*/, expenseController_1.default.delete(db, user._id, req.params.expenseId)];
            case 1:
                result = _a.sent();
                if (result) {
                    res.json({
                        success: true,
                        data: {
                            message: "Successfully deleted entry with ID: ".concat(req.params.expenseId),
                        },
                    });
                }
                else {
                    throw new Error("Error while deleting");
                }
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                console.log(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
