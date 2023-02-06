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

export interface Month {
	name: MonthName;
	days: Array<Day>;
}

export interface Day {
	day: number;
	expenses: Array<Expense>;
}

export interface Expense {
	title: string;
	description?: string;
	cost: number;
}

export interface IUser {
	username: string;
	password: string;
	email: string;
}
