import express from "express";
import { getDb } from "../utils/database";
import bcrypt from "bcrypt";
import newJWT from "../utils/newJWT";

export const router = express.Router();

// Login
router.post("/", async (req, res) => {
	try {
		const { username, password } = req.body;
		const db = getDb().collection("users");
		// Check if user with the given username exists
		const user = await db.findOne({ username: username });
		if (!user) {
			throw new Error("User with that username doesn't exist");
		}
		if (!(await bcrypt.compare(password, user.password))) {
			throw new Error("Incorrect password");
		}

		res.json({
			success: true,
			data: { jwt: newJWT(user) },
		});
	} catch (e) {
		console.log(e);
	}
});
