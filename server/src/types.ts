import { ObjectId } from "mongodb";

export interface IUser {
	username: string;
	password: string;
	email: string;
}
export interface IExpense {
	title: string;
	description: string;
	year: number;
	month: number;
	date: number;
	price: number;
	userId: ObjectId;
}
