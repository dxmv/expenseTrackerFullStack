import React, { useState } from "react";
import { useCreateExpenseMutation } from "../redux/api/expenseSlice";
import { IFormError } from "../types";
import { setFormError } from "../utils/formError";
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

const MAX_TITLE: number = 25,
	MAX_DESC: number = 50;

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
	const [createExpense] = useCreateExpenseMutation();

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		try {
			const res = await createExpense(expense).unwrap();
			console.log(res);
		} catch (e: any) {
			setFormError(setError, (e as Error).message, "formError");
			setTitle("");
			setDescription("");
		}
	};

	const setTitle = (val: string) => {
		if (val.length > MAX_TITLE) {
			setFormError(
				setError,
				`Title can't be longer than ${MAX_TITLE} characters`,
				"titleError"
			);
		} else {
			setFormError(setError, "", "titleError");
		}
		setExpense(prev => ({ ...prev, title: val }));
	};
	const setPrice = (val: string) => {
		if (Number(val) < 0) {
			setFormError(setError, "Price can't be less than 0", "priceError");
		} else {
			setFormError(setError, "", "priceError");
		}
		setExpense(prev => ({ ...prev, price: Number(val) }));
	};
	const setDescription = (val: string) => {
		if (val.length > MAX_DESC) {
			setFormError(
				setError,
				`Description can't be longer than ${MAX_DESC} characters`,
				"descriptionError"
			);
		} else {
			setFormError(setError, "", "descriptionError");
		}
		setExpense(prev => ({ ...prev, description: val }));
	};

	return (
		<form className="flex flex-col">
			<div className="grid grid-cols-2 gap-3 mb-3">
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
			{/* Textarea error show */}
			<TextArea
				value={expense.description}
				error={error.descriptionError}
				setValue={setDescription}
				label="Description"
			/>
			<Button
				text="Submit"
				onClick={handleSubmit}
				className={"disabled:bg-darkGreen"}
				disabled={
					expense.title === "" ||
					expense.price === 0 ||
					error.priceError !== "" ||
					error.formError !== "" ||
					error.descriptionError !== "" ||
					error.titleError !== ""
				}
			/>
		</form>
	);
}
