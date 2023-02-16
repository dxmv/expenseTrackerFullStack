export type MonthName =
	| "January"
	| "February"
	| "March"
	| "April"
	| "May"
	| "June"
	| "July"
	| "August"
	| "September"
	| "October"
	| "November"
	| "December";

// export interface Month {
// 	name: MonthName;
// 	days: Array<Day>;
// }

export interface IDay {
	date: string;
	fullDate: string;
	dayOfWeek: string;
	expenses: IExpense[];
}

export interface IExpense {
	title: string;
	description: string;
	date: string;
	price: number;
	userId: string;
}

export interface IUser {
	username: string;
	password: string;
	email: string;
	_id: string;
}

export interface IFormError {
	form: string;
}
