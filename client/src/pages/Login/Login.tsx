import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { useLoginMutation } from "../../redux/api/userSlice";
import { IFormError } from "../../types";
import { setFormError } from "../../utils/formError";

interface LoginState {
	username: string;
	password: string;
}

interface ErrorState extends IFormError {
	username: string;
	password: string;
}

export default function Login() {
	const [login] = useLoginMutation();
	const [loginState, setLoginState] = useState<LoginState>({
		username: "",
		password: "",
	});
	const [error, setError] = useState<ErrorState>({
		username: "",
		password: "",
		form: "",
	});

	const handleSubmit = async () => {
		try {
			const result = await login(loginState);
			console.log(result);
		} catch (e: unknown) {
			console.log(e);
			setFormError(
				setError as React.Dispatch<React.SetStateAction<IFormError>>,
				(e as Error).message,
				"form"
			);
		}
		return false;
	};

	const setUsername = async (value: string) => {
		await setLoginState(prev => ({ ...prev, username: value }));
	};

	const setPassword = async (value: string) => {
		await setLoginState(prev => ({ ...prev, password: value }));
	};

	return (
		<div className="w-full h-screen flex justify-center items-center bg-darkGreen">
			<div className="bg-myWhite w-1/5 border-md shadow-md shadow-myGray flex flex-col items-center py-5 px-4">
				<h1 className="uppercase text-3xl mb-5 font-bold">LOG IN</h1>
				<div>
					<p>{error.username}</p>
					<TextInput
						label="Username:"
						value={loginState.username}
						setValue={setUsername}
					/>
					<TextInput
						label="Password:"
						value={loginState.password}
						password={true}
						setValue={setPassword}
					/>
					<Button
						text="LOG IN"
						className="text-myWhite bg-lightGreen rounded-md self-start w-full shadow-myBlack shadow-md mb-5"
						onClick={handleSubmit}
					/>
				</div>
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
