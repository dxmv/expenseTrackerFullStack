import express from "express";
import { getDb } from "../utils/database";
import passport from "passport";
import expenseController from "../controllers/expenseController";
import Expense from "../models/Expense";
import { ObjectId } from "mongodb";

export const router = express.Router();

// Get all expenses for a user
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const user: any = req.user;
			const db = getDb().collection("expenses");
			const expenses = await expenseController.getAll(db, user._id);
			res.json({
				success: true,
				data: { ...expenses },
			});
		} catch (e) {
			console.log(e);
		}
	}
);

// Add a new expense for a user
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const user: any = req.user;
			const db = getDb().collection("expenses");
			let { title, description, year, month, date, price } = req.body;
			if (!year || !month || !date) {
				const today = new Date();
				[year, month, date] = [
					today.getFullYear(),
					today.getMonth() + 1,
					today.getDate(),
				];
			}
			const expense = await expenseController.create(
				db,
				new Expense(user._id, title, description, price, year, month, date)
			);
			res.json({
				success: true,
				data: { ...expense },
			});
		} catch (e) {
			console.log(e);
		}
	}
);

// Edit an expense
router.put(
	"/:expenseId",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
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
			console.log(e);
		}
	}
);

// Delete an expense
router.delete(
	"/:expenseId",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
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
			console.log(e);
		}
	}
);
