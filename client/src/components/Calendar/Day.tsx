import React from "react";
import { IExpense } from "../../types";

export default function Day({ expenses }: { expenses: IExpense[] }) {
	return <div>Expenses:{expenses.length}</div>;
}
