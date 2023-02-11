import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { useRegisterMutation } from "../../redux/api/userSlice";
import { IFormError } from "../../types";
import { setFormError } from "../../utils/formError";

interface LoginState {
	username: string;
	password: string;
	email: string;
}

interface ErrorState extends IFormError {
	username: string;
	password: string;
	email: string;
}

export default function Register() {
	const [register] = useRegisterMutation();
	const navigate = useNavigate();
	const [registerState, setRegisterState] = useState<LoginState>({
		username: "",
		password: "",
		email: "",
	});
	const [error, setError] = useState<ErrorState>({
		username: "",
		password: "",
		form: "",
		email: "",
	});

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		try {
			if (error.form !== "") {
				setFormError(
					setError as React.Dispatch<React.SetStateAction<IFormError>>,
					"",
					"form"
				);
			}
			await register(registerState).unwrap();
			navigate("/log_in");
		} catch (e: unknown) {
			setFormError(
				setError as React.Dispatch<React.SetStateAction<IFormError>>,
				(e as any).data.data.message,
				"form"
			);
		}
	};

	const setUsername = async (value: string) => {
		// if (error.form !== "") {
		// 	setFormError(
		// 		setError as React.Dispatch<React.SetStateAction<IFormError>>,
		// 		"",
		// 		"form"
		// 	);
		// }
		await setRegisterState(prev => ({ ...prev, username: value }));
	};

	const setPassword = async (value: string) => {
		// if (error.form !== "") {
		// 	setFormError(
		// 		setError as React.Dispatch<React.SetStateAction<IFormError>>,
		// 		"",
		// 		"form"
		// 	);
		// }
		await setRegisterState(prev => ({ ...prev, password: value }));
	};

	const setEmail = async (value: string) => {
		await setRegisterState(prev => ({ ...prev, email: value }));
	};

	return (
		<div className="w-full h-screen flex justify-center items-center bg-darkGreen">
			<div className="bg-myWhite w-1/5 border-md shadow-md shadow-myGray flex flex-col items-center py-5 px-4">
				<h1 className="uppercase text-3xl mb-5 font-bold">sign up</h1>
				<form>
					<p>{error.form}</p>
					<TextInput
						label="Username:"
						value={registerState.username}
						setValue={setUsername}
						error={error.username}
					/>
					<TextInput
						label="Email:"
						value={registerState.email}
						setValue={setEmail}
						error={error.email}
					/>
					<TextInput
						label="Password:"
						value={registerState.password}
						password={true}
						setValue={setPassword}
						error={error.password}
					/>
					<Button
						text="SIGN UP"
						className="text-myWhite bg-lightGreen rounded-md self-start w-full shadow-myBlack shadow-md mb-5"
						onClick={handleSubmit}
					/>
				</form>
				<p>
					Already have an account?{" "}
					<Link to="/log_in" className="text-darkGreen">
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
}
