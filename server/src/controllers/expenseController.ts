import { Collection, Document, ObjectId, WithId } from "mongodb";
import { ForbiddenError, NotFoundError } from "../errors/errors";
import Expense from "../models/Expense";
import { IExpense } from "../types";

const expenseController = {
	getAll: async (db: Collection<Document>, userId: string | ObjectId) =>
		await db.find({ userId: new ObjectId(userId) }).toArray(),

	getById: async (db: Collection<Document>, id: string | ObjectId) =>
		await db.findOne({ _id: new ObjectId(id) }),
	create: async (db: Collection<Document>, expense: Expense) => {
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
			throw new NotFoundError("Expense not found");
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
			throw new NotFoundError("Expense not found");
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
			throw new ForbiddenError();
		}
	},
};

export default expenseController;
