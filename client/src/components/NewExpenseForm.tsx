import React from "react";

export default function NewExpenseForm() {
	return (
		<div className="flex flex-col">
			{/* export interface IExpense {
    title: string;
    description: string;
    year: number;
    month: number;
    date: number;
    price: number;
    userId: ObjectId;
  } */}
			<div className="grid grid-cols-2 gap-3 mb-3">
				<input type="text" className="bg-myGray" />
				<input type="text" className="bg-myGray" />
			</div>
			<textarea className="bg-myGray" rows={10}></textarea>
		</div>
	);
}
