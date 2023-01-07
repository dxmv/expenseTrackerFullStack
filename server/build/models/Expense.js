"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Expense = /** @class */ (function () {
    function Expense(name, description, year, month, date) {
        this.name = name;
        this.description = description;
        this.year = year;
        this.month = month;
        this.date = date;
    }
    return Expense;
}());
exports.default = Expense;
