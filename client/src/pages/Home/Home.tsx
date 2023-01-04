import React from "react";
import Button from "../../components/Button";

export default function Home() {
	const user = false;
	return (
		<div className={`w-full px-4 ${!user ? "h-screen bg-myGray" : ""}`}>
			{user ? <HomeLoggedIn /> : <HomeLoggedOut />}
		</div>
	);
}

const HomeLoggedIn = () => {
	return <p>Logged</p>;
};

const HomeLoggedOut = () => {
	return (
		<div className="flex w-full h-screen justify-center items-center flex-col">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<img
						src="https://www.lifewire.com/thmb/EUmRZwLi1DvEROoPcp3Nt-YZtuw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/womanonspreadsheet-183673d763a642f694a0f658c969aaa9.jpg"
						alt="Cover"
					/>
				</div>
				<div className="flex flex-col">
					<h1 className="mb-5 text-3xl text-lightGreen font-bold">
						Expense tracking, but fun
					</h1>
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
						onClick={() => console.log("redirect")}
					/>
				</div>
			</div>
		</div>
	);
};
