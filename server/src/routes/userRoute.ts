import express from "express";
import { getDb } from "../utils/database";
import userController from "../controllers/userController";

export const router = express.Router();

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const db = getDb().collection("users");
		// Get the user with the specified ID from the database
		const user = await userController.getUserById(db, id);
		if (!user) {
			// throw error
		}
		res.json({
			success: true,
			data: { user },
		});
	} catch (e) {
		console.log(e);
	}
});

router.post("/", async (req, res) => {
	try {
		console.log(req.body);
		const { username, email, password } = req.body;
		const db = getDb().collection("users");
		// Save the new user to the database
		const newUser = await userController.createUser(
			db,
			username,
			email,
			password
		);

		res.json({
			success: true,
			data: {
				newUser,
			},
		});
	} catch (e) {
		console.log(e);
	}
});
