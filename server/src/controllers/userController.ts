import { Collection, Document, ObjectId } from "mongodb";
import User from "../models/User";
import bcrypt from "bcrypt";

const userController = {
	getUserById: async (db: Collection<Document>, id: string | ObjectId) =>
		await db.findOne({ _id: new ObjectId(id) }),

	createUser: async (
		db: Collection<Document>,
		username: string,
		email: string,
		password: string
	) => {
		const user: Document = new User(
			(await userController.checkUsername(db, username)) ? username : "",
			(await userController.checkEmail(db, email)) ? email : "",
			(await userController.checkPassword(db, password))
				? await bcrypt.hash(password, 10)
				: ""
		);
		user.expenses = [];
		const res = await db.insertOne(user);
		return await userController.getUserById(db, res.insertedId);
	},

	updateUser: async (
		db: Collection<Document>,
		id: string,
		username: string,
		email: string
	) => {
		const user: Document = await db.findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{ $set: { email: email, username: username } }
		);
		return await await userController.getUserById(db, id);
	},

	checkUsername: async (
		db: Collection<Document>,
		username: string
	): Promise<boolean> => {
		if (await db.findOne({ username: username })) {
			throw new Error("Username is already in use");
		}
		if (username.length < 4 || username.length > 25) {
			throw new Error("Username must be between 4 and 25 chars long");
		}
		return true;
	},

	checkEmail: async (
		db: Collection<Document>,
		email: string
	): Promise<boolean> => {
		if (await db.findOne({ email: email })) {
			throw new Error("Username is already in use");
		}
		if (email.length < 4 || email.length > 25) {
			throw new Error("Username must be between 4 and 25 chars long");
		}
		return true;
	},

	checkPassword: async (
		db: Collection<Document>,
		password: string
	): Promise<boolean> => {
		if (password.length < 8) {
			throw new Error("Password must be at least 8 chars long");
		}
		return true;
	},
};

export default userController;
