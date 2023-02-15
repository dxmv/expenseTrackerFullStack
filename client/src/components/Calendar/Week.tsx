import React, { useEffect, useState } from "react";
import { useGetExpensesQuery } from "../../redux/api/expenseSlice";
import { IExpense } from "../../types";
import Day from "./Day";

export default function Week() {
	// GET ALL EXPENSES FOR THIS WEEK FROM BACKEND AND SHOW THEM ON THE PAGE
	const [map, setMap] = useState<IExpense[][]>([]);
	const { data, isError } = useGetExpensesQuery("week");

	useEffect(() => {
		if (!data) {
			return;
		}
		// Start the loop 1 week ago
		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
		const end = new Date();
		let loop = new Date(oneWeekAgo);
		let currentIndex = 0;
		const newMap: IExpense[][] = [];
		while (loop <= end) {
			const arr: IExpense[] = [];
			const currentDate = loop.toISOString().substring(0, 10);
			// Loop through all expenses the last week
			for (; currentIndex < data.data.length; currentIndex++) {
				// If the date of the expenses is equal to the current date of the main loop add it to the array
				if (data.data[currentIndex].date.substring(0, 10) === currentDate) {
					console.log(data.data[currentIndex].date.substring(0, 10));
					arr.push(data.data[currentIndex]);
				} else {
					break;
				}
			}
			newMap.push(arr);
			let newDate = loop.setDate(loop.getDate() + 1);
			loop = new Date(newDate);
		}
		console.log(newMap);
		setMap(newMap);
	}, [data]);
	if (!data || isError || !data.success) {
		return <div>Zoki</div>;
	}

	console.log(data.data);
	return (
		<div>
			{map.map((el, i) => (
				<Day key={i} expenses={el} />
			))}
		</div>
	);
}
