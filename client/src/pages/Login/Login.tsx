import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

export default function Login() {
	const handleSubmit = () => {};

	return (
		<div className="w-full h-screen flex justify-center items-center bg-darkGreen">
			<div className="bg-myWhite w-1/5 border-md shadow-md shadow-myGray flex flex-col items-center py-5 px-4">
				<h1 className="uppercase text-3xl mb-5 font-bold">LOG IN</h1>
				<form>
					<TextInput label="Username:" />
					<TextInput label="Password:" password={true} />
					<Button
						text="Submit"
						className="text-myWhite bg-lightGreen rounded-md self-start w-full shadow-myBlack shadow-md mb-5"
						onClick={handleSubmit}
					/>
				</form>
				<p>
					Don't have an account?{" "}
					<Link to="/sign_up" className="text-darkGreen">
						Sign up now
					</Link>
				</p>
			</div>
		</div>
	);
}
