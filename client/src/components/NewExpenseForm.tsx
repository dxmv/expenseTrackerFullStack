import React, { useState } from "react";
import Button from "./Button";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

interface INewExpense {
	title: string;
	price: number;
	description: string;
}

interface IErrors {
	titleError: string;
	priceError: string;
	descriptionError: string;
	formError: string;
}

export default function NewExpenseForm() {
	const [expense, setExpense] = useState<INewExpense>({
		title: "",
		price: 0,
		description: "",
	});
	const [error, setError] = useState<IErrors>({
		titleError: "",
		formError: "",
		descriptionError: "",
		priceError: "",
	});

	const handleSubmit = () => {};

	const setTitle = (val: string) => {};
	const setPrice = (val: string) => {};
	const setDescription = (val: string) => {};

	return (
		<form className="flex flex-col">
			<div className="grid grid-cols-2 gap-3 mb-3">
				{/* <input type="text" className="bg-myGray" /> */}
				<TextInput
					label="Title:"
					value={expense.title}
					setValue={setTitle}
					error={error.titleError}
				/>
				<TextInput
					label="Price:"
					value={expense.price as unknown as string}
					setValue={setPrice}
					error={error.priceError}
					type="number"
				/>
			</div>
			<TextArea
				value={expense.description}
				error={error.descriptionError}
				setValue={setDescription}
				label="Description"
			/>
			<Button text="Submit" onClick={handleSubmit} className={""} />
		</form>
	);
}
