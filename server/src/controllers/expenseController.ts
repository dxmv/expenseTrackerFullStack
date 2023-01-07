import { Collection, Document, ObjectId } from "mongodb";
import Expense from "../models/Expense";

const getAllExpenses = (db: Collection<Document>, userId: string) =>
	db.find({ userId: userId });

const getExpenseById = (db: Collection<Document>, id: string | ObjectId) =>
	db.findOne({ _id: new ObjectId(id) });

const createNewExpense = async (db: Collection<Document>, expense: Expense) => {
	if (expense.year < 2023 || expense.year > 2050) {
		throw new Error("Invalid year");
	}
	if (expense.month < 1 || expense.month > 12) {
		throw new Error("Invalid month");
	}
	if (expense.date < 1 || expense.date > 31) {
		throw new Error("Invalid date");
	}
	const res = await db.insertOne(expense);
	return await getExpenseById(db, res.insertedId);
};

export default { getAllExpenses, createNewExpense, getExpenseById };
