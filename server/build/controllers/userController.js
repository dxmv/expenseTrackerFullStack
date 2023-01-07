"use strict";
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
var mongodb_1 = require("mongodb");
var User_1 = __importDefault(require("../models/User"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var getUserById = function (db, id) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, db.findOne({ _id: new mongodb_1.ObjectId(id) })];
}); }); };
var createUser = function (db, username, email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = User_1.default.bind;
                return [4 /*yield*/, checkUsername(db, username)];
            case 1:
                _b = [void 0, (_d.sent()) ? username : ""];
                return [4 /*yield*/, checkEmail(db, email)];
            case 2:
                _b = _b.concat([(_d.sent()) ? email : ""]);
                return [4 /*yield*/, checkPassword(db, password)];
            case 3:
                if (!(_d.sent())) return [3 /*break*/, 5];
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 4:
                _c = _d.sent();
                return [3 /*break*/, 6];
            case 5:
                _c = "";
                _d.label = 6;
            case 6:
                user = new (_a.apply(User_1.default, _b.concat([_c])))();
                return [4 /*yield*/, db.insertOne(user)];
            case 7:
                _d.sent();
                return [2 /*return*/, user];
        }
    });
}); };
var updateUser = function (db, id, username, email) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: { email: email, username: username } })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, getUserById(db, id)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var checkUsername = function (db, username) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.findOne({ username: username })];
            case 1:
                if (_a.sent()) {
                    throw new Error("Username is already in use");
                }
                if (username.length < 4 || username.length > 25) {
                    throw new Error("Username must be between 4 and 25 chars long");
                }
                return [2 /*return*/, true];
        }
    });
}); };
var checkEmail = function (db, email) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.findOne({ email: email })];
            case 1:
                if (_a.sent()) {
                    throw new Error("Username is already in use");
                }
                if (email.length < 4 || email.length > 25) {
                    throw new Error("Username must be between 4 and 25 chars long");
                }
                return [2 /*return*/, true];
        }
    });
}); };
var checkPassword = function (db, password) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (password.length < 8) {
            throw new Error("Password must be at least 8 chars long");
        }
        return [2 /*return*/, true];
    });
}); };
exports.default = { getUserById: getUserById, createUser: createUser, updateUser: updateUser };
