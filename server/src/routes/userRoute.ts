import express from "express";
import { getDb } from "../utils/database";
import userController from "../controllers/userController";
import passport from "passport";
import isAdmin from "../middleware/isAdmin";
import { NotFoundError } from "../errors/errors";

export const router = express.Router();

// // Get all users
// router.get(
// 	"/",
// 	passport.authenticate("jwt", { session: false }),
// 	isAdmin,
// 	async (req, res) => {
// 		next("zoki");
// 	}
// );

// Get current user

router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const u: any = req.user;
			const db = getDb().collection("users");
			const user = await userController.getUserById(db, u._id);
			if (!user) {
				throw new NotFoundError("User doesn't exist");
			}
			res.json({
				success: true,
				data: { ...user },
			});
		} catch (e) {
			next(e);
		}
	}
);

// Get user by id
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const db = getDb().collection("users");
		const user = await userController.getUserById(db, id);
		if (!user) {
			throw new NotFoundError("User doesn't exist");
		}
		res.json({
			success: true,
			data: { ...user },
		});
	} catch (e) {
		next(e);
	}
});

// Register route
router.post("/", async (req, res, next) => {
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
			data: { ...newUser },
		});
	} catch (e) {
		next(e);
	}
});

// Update user
router.put(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const { username, email } = req.body;
			const user: any = req.user;
			const db = getDb().collection("users");
			const newUser = await userController.updateUser(
				db,
				user._id,
				username,
				email
			);
			res.json({
				success: true,
				data: { ...newUser },
			});
		} catch (e) {
			next(e);
		}
	}
);

// router.delete("/:id",async(req,res)=>{

// });
