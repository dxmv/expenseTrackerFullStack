import express from "express";
import { getDb } from "../utils/database";
import passport from "passport";
import expenseController from "../controllers/expenseController";
import Expense from "../models/Expense";
import { Document, ObjectId, WithId } from "mongodb";

export const router = express.Router();

// Get all expenses for a user
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			const db = getDb().collection("expenses");
			let expenses = await expenseController.getAll(db, user._id);
			if (req.query.filter === "week") {
				const oneWeekAgo = new Date();
				oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
				expenses = expenses.filter(
					(obj: WithId<Document>) => obj.date > oneWeekAgo
				);
			}
			if (req.query.filter === "month") {
				const oneMonthAgo = new Date();
				oneMonthAgo.setDate(oneMonthAgo.getDate() - 31);
				expenses = expenses.filter(
					(obj: WithId<Document>) => obj.date > oneMonthAgo
				);
			}
			res.json({
				success: true,
				data: { ...expenses },
			});
		} catch (e) {
			next(e);
		}
	}
);

// Add a new expense for a user
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			const db = getDb().collection("expenses");
			let { title, description, date, price } = req.body;
			if (!date) {
				date = new Date();
			}
			const expense = await expenseController.create(
				db,
				new Expense(user._id, title, description, price, date)
			);
			res.json({
				success: true,
				data: { ...expense },
			});
		} catch (e) {
			next(e);
		}
	}
);

// Edit an expense
router.put(
	"/:expenseId",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			const db = getDb().collection("expenses");
			let { title, description, price } = req.body;
			const expense = await expenseController.update(
				db,
				user._id,
				req.params.expenseId,
				{ title, description, price }
			);
			res.json({
				success: true,
				data: { ...expense },
			});
		} catch (e) {
			next(e);
		}
	}
);

// Delete an expense
router.delete(
	"/:expenseId",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			const db = getDb().collection("expenses");
			const result = await expenseController.delete(
				db,
				user._id,
				req.params.expenseId
			);
			if (result) {
				res.json({
					success: true,
					data: {
						message: `Successfully deleted entry with ID: ${req.params.expenseId}`,
					},
				});
			} else {
				throw new Error("Error while deleting");
			}
		} catch (e) {
			next(e);
		}
	}
);
