"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Expense = /** @class */ (function () {
    function Expense(userId, title, description, price, year, month, date) {
        this.title = title;
        this.description = description;
        this.year = year;
        this.month = month;
        this.date = date;
        this.price = price;
        this.userId = userId;
    }
    return Expense;
}());
exports.default = Expense;
