import { ObjectId } from "mongodb";

class Expense {
	title: string;
	description: string;
	date: Date;
	price: number;
	userId: ObjectId;

	constructor(
		userId: ObjectId,
		title: string,
		description: string,
		price: number,
		date: Date
	) {
		this.title = title;
		this.description = description;
		this.date = date;
		this.price = price;
		this.userId = userId;
	}
}

export default Expense;
