import express from "express";
import { getDb } from "../utils/database";
import bcrypt from "bcrypt";
import newJWT from "../utils/newJWT";
import { BadRequestError, NotFoundError } from "../errors/errors";

export const router = express.Router();

// Login
router.post("/", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const db = getDb().collection("users");
		// Check if user with the given username exists
		const user = await db.findOne({ username: username });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new BadRequestError("Incorrect credentials");
		}

		res.json({
			success: true,
			data: { jwt: newJWT(user) },
		});
	} catch (e) {
		next(e);
	}
});
