import React from "react";
import { Link } from "react-router-dom";
import { IDay } from "../../types";

export default function Day({ day, index }: { day: IDay; index: number }) {
	return (
		<Link
			to={`/day/${day.fullDate}`}
			className={`border-2  w-full flex-col py-3 px-4 justify-between h-52 
			${index === 0 || index % 7 === 0 ? "border-l-2" : "border-l-0"} 
			${index > 6 ? "border-t-0" : "border-t-2"}`}
		>
			<div className="flex items-center justify-between">
				<p className="text-2xl font-extrabold">{day.date}</p>
				<p className="text-2xl font-extrabold">{day.dayOfWeek}</p>
			</div>
			<div>
				<p>Expenses: {day.expenses.length}</p>
				<p>
					Total:{" "}
					{day.expenses.reduce((prev, current) => (prev += current.price), 0)}
				</p>
			</div>
		</Link>
	);
}
