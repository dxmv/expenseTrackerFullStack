// import { IUser } from "../../types";
import { IExpense, IUser } from "../../types";
import { apiSlice } from "./apiSlice";

const MAIN_URL = "/expenses/";

export const expenseApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getExpenses: build.query<
			{ success: boolean; data: IExpense[] },
			string | null
		>({
			query: filter => ({
				url: `${MAIN_URL}?filter=${filter && filter}`,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetExpensesQuery } = expenseApi;
