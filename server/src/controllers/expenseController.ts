import { Collection, Document, ObjectId, WithId } from "mongodb";
import Expense from "../models/Expense";
import { IExpense } from "../types";

const expenseController = {
	getAll: async (db: Collection<Document>, userId: string) =>
		await db.find({ userId: userId }),

	getById: async (db: Collection<Document>, id: string | ObjectId) =>
		await db.findOne({ _id: new ObjectId(id) }),
	create: async (db: Collection<Document>, expense: Expense) => {
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
		return await expenseController.getById(db, res.insertedId);
	},
	update: async (
		db: Collection<Document>,
		userId: ObjectId,
		id: string,
		expense: Omit<IExpense, "year" | "date" | "month" | "userId">
	) => {
		const current = await expenseController.getById(db, id);
		if (!current) {
			throw new Error("There was an error, please try again");
		}
		await expenseController.belongsToUser(userId, current);
		await db.findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{
				$set: {
					title: expense.title,
					description: expense.description,
					price: expense.price,
				},
			}
		);
		return await expenseController.getById(db, id);
	},
	delete: async (db: Collection<Document>, userId: ObjectId, id: string) => {
		const current = await expenseController.getById(db, id);
		if (!current) {
			throw new Error("There was an error, please try again");
		}
		await expenseController.belongsToUser(userId, current);
		await db.findOneAndDelete({ _id: new ObjectId(id) });
		return true;
	},
	belongsToUser: async (
		userId: ObjectId,
		expense: WithId<Document>
	): Promise<void> => {
		if (!userId.equals(expense.userId)) {
			throw new Error("This expense doesn't belong to you");
		}
	},
};

export default expenseController;
