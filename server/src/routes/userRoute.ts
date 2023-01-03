import express from "express";
import { getDb } from "../utils/database";
import userController from "../controllers/userController";

export const router = express.Router();

// Get user by id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const db = getDb().collection("users");
		// Get the user with the specified ID from the database
		const user = await userController.getUserById(db, id);
		if (!user) {
			// throw error
			throw Error("User doesn't exist");
		}
		res.json({
			success: true,
			data: { user },
		});
	} catch (e) {
		console.log(e);
	}
});

// Register route
router.post("/", async (req, res) => {
	try {
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

// Update user
router.put("/:id", async (req, res) => {
	try {
		const { username, email } = req.body;
		const db = getDb().collection("users");
		// Save the new user to the database
		const newUser = await userController.updateUser(
			db,
			req.params.id,
			username,
			email
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
