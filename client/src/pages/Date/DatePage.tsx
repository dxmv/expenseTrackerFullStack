import React from "react";
import { useParams } from "react-router-dom";
import { useGetExpensesByDateQuery } from "../../redux/api/expenseSlice";
import { IExpense } from "../../types";
import { ISOstringToPrettier } from "../../utils/dateFunctions";

export default function DatePage() {
	const params = useParams();
	const { data, isError } = useGetExpensesByDateQuery(params.date ?? "");
	if (isError || !data || !data.success) {
		return <div>Zoran</div>;
	}
	console.log(data);
	return (
		<div className="px-4 py-20 flex flex-col bg-myWhite h-screen">
			<h1 className="text-3xl font-extrabold mb-4">
				Your expenses for {ISOstringToPrettier(params.date)}
			</h1>
			{data.data.length <= 0 ? (
				<div>No expenses for this day</div>
			) : (
				<table className="w-1/2 border-collapse border-spacing-0 table-fixed">
					<thead className="border-b-2 bg-myGray">
						<th className="w-full table-row text-left">
							<td className="p-3 font-semibold text-lightGreen ">Name</td>
							<td className="p-3 font-semibold text-lightGreen">Description</td>
							<td className="p-3 font-semibold text-lightGreen ">Price</td>
						</th>
					</thead>
					<tbody className="odd:w-1/2">
						{data.data.map(el => (
							<ExpenseComponent expense={el} />
						))}
					</tbody>
				</table>
			)}
			<p className="font-bold text-2xl mt-4 ">
				Total: {data.data.reduce((a, b) => a + b.price, 0)}
			</p>
		</div>
	);
}

const ExpenseComponent = ({ expense }: { expense: IExpense }) => {
	return (
		<tr className="w-full table-row text-left border-b-2">
			<td className="p-3   ">{expense.title}</td>
			{/* Limit desc charachters*/}
			<td className="p-3  ">{expense.description ?? "No description"}</td>
			<td className="p-3   ">{expense.price}</td>
		</tr>
	);
};
