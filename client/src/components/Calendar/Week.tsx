import React, { useEffect, useState } from "react";
import { useGetExpensesQuery } from "../../redux/api/expenseSlice";
import { IExpense } from "../../types";
import Day from "./Day";
import { IDay } from "../../types";
import { getDayWeekFromNumber } from "../../utils/dateFunctions";

export default function Week() {
	// GET ALL EXPENSES FOR THIS WEEK FROM BACKEND AND SHOW THEM ON THE PAGE
	const [map, setMap] = useState<IDay[]>([]);
	const { data, isError } = useGetExpensesQuery("week");

	useEffect(() => {
		if (!data) {
			return;
		}
		// Start the loop 1 week ago
		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
		const end = new Date();
		let loop = new Date(oneWeekAgo);
		let currentIndex = 0;
		const newMap: IDay[] = [];
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
			newMap.push({
				date: loop.getDate().toString(),
				fullDate: currentDate,
				dayOfWeek: getDayWeekFromNumber(loop.getDay()),
				expenses: arr,
			});
			let newDate = loop.setDate(loop.getDate() + 1);
			loop = new Date(newDate);
		}
		console.log(newMap);
		setMap(newMap);
	}, [data]);
	if (!data || isError || !data.success) {
		// Handle Error
		return <div>Zoki</div>;
	}

	return (
		<div className="flex flex-row">
			{map.map((el, i) => (
				<Day key={i} day={el} index={i} />
			))}
		</div>
	);
}
