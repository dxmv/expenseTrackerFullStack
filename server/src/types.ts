import { ObjectId } from "mongodb";

export interface IUser {
	username: string;
	password: string;
	email: string;
}
export interface IExpense {
	title: string;
	description: string;
	date: Date;
	price: number;
	userId: ObjectId;
}
export interface IError {
	status: number;
	message: string;
}
