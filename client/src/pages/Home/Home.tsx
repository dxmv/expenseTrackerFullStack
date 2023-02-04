import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { getMonthNameFromNumber } from "../../utils/dateFunctions";
import NewExpenseForm from "../../components/NewExpenseForm";
import Week from "../../components/Calendar/Week";

export default function Home() {
	const user = true;
	return (
		<div className={`w-full ${!user ? "h-screen" : ""}`}>
			{user ? <HomeLoggedIn /> : <HomeLoggedOut />}
		</div>
	);
}

const HomeLoggedIn = () => {
	const [date, setDate] = useState<Date | null>();

	useEffect(() => {
		setDate(new Date());
	}, []);

	if (!date) {
		return <>a</>;
	}

	return (
		<div className="px-4 py-20">
			<div className="grid gap-1" style={{ gridTemplateColumns: "2fr 1fr" }}>
				<div>
					<p className="font-bold text-3xl mb-4">Today's expenses</p>
				</div>
				<div>
					<p className="font-bold text-3xl mb-4">Add a new expense</p>
					<NewExpenseForm />
				</div>
			</div>
			<p>This week</p>
			<Week />
			<p>This month - {getMonthNameFromNumber(date.getMonth())}</p>
		</div>
	);
};

const HomeLoggedOut = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/sign_up");
	};
	return (
		<div
			className="flex w-full h-full justify-center items-center flex-col px-4"
			style={{
				background:
					"linear-gradient(180deg, rgba(69,73,85,1) 0%, rgba(13,10,11,1) 99%)",
			}}
		>
			<div className="grid grid-cols-2 gap-4">
				<div className="flex justify-center items-center">
					<img
						src="https://www.workitdaily.com/media-library/woman-using-excel-to-make-a-spreadsheet-on-her-computer.jpg?id=32107297&width=600&height=400&coordinates=0%2C0%2C0%2C0"
						alt="Cover"
						className="rounded-md shadow-md shadow-darkGreen"
					/>
				</div>
				<div className="flex flex-col">
					<p className="mb-5 text-3xl text-lightGreen font-bold">
						Expense tracking, but fun
					</p>
					<p className="text-myWhite text-lg mb-10 leading-6 font-medium w-full">
						Do you ever wonder where does all of your money go at the end of
						each month? Well, I was in the same boat so I decided to make an
						application, where you can track expenses without 100 different
						notebooks and with just a few clicks. To access the application
						first you need to create an account.
					</p>
					<Button
						text="Start now"
						className="text-myWhite bg-lightGreen rounded-md self-start shadow-myWhite shadow-sm"
						onClick={handleClick}
					/>
				</div>
			</div>
		</div>
	);
};
