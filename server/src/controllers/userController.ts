import { Collection, Document } from "mongodb";
import { IUser } from "../types";
import User from "../models/User";

const getUserById = async (db: Collection<Document>, id: string) =>
	db.find({ userId: id });

const createUser = async (
	db: Collection<Document>,
	username: string,
	email: string,
	password: string
) => {
	const user: Document = new User(username, email, password);
	await db.insertOne(user);
	return user;
};

export default { getUserById, createUser };
