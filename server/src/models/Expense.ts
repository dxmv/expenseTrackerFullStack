import { ObjectId } from "mongodb";

class Expense {
	title: string;
	description: string;
	year: number;
	month: number;
	date: number;
	price: number;
	userId: ObjectId;

	constructor(
		userId: ObjectId,
		title: string,
		description: string,
		price: number,
		year: number,
		month: number,
		date: number
	) {
		this.title = title;
		this.description = description;
		this.year = year;
		this.month = month;
		this.date = date;
		this.price = price;
		this.userId = userId;
	}
}

export default Expense;
