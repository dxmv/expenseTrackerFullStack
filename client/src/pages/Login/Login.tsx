import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isRegExp } from "util/types";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { useLoginMutation } from "../../redux/api/userSlice";
import { IFormError } from "../../types";
import { setFormError } from "../../utils/formError";
import { setToken } from "../../utils/jwtTokenHandle";

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
	const navigate = useNavigate();
	const [loginState, setLoginState] = useState<LoginState>({
		username: "",
		password: "",
	});
	const [error, setError] = useState<ErrorState>({
		username: "",
		password: "",
		form: "",
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
			const result = await login(loginState).unwrap();
			await setToken(result.data.token);
			navigate("/");
		} catch (e: unknown) {
			setFormError(
				setError as React.Dispatch<React.SetStateAction<IFormError>>,
				(e as any).data.data.message,
				"form"
			);
		}
	};

	const setUsername = async (value: string) => {
		if (error.form !== "") {
			setFormError(
				setError as React.Dispatch<React.SetStateAction<IFormError>>,
				"",
				"form"
			);
		}
		await setLoginState(prev => ({ ...prev, username: value }));
	};

	const setPassword = async (value: string) => {
		if (error.form !== "") {
			setFormError(
				setError as React.Dispatch<React.SetStateAction<IFormError>>,
				"",
				"form"
			);
		}
		await setLoginState(prev => ({ ...prev, password: value }));
	};

	return (
		<div className="w-full h-screen flex justify-center items-center bg-darkGreen">
			<div className="bg-myWhite w-1/5 border-md shadow-md shadow-myGray flex flex-col items-center py-5 px-4">
				<h1 className="uppercase text-3xl mb-5 font-bold">LOG IN</h1>
				<form>
					<p>{error.form}</p>
					<TextInput
						label="Username:"
						value={loginState.username}
						setValue={setUsername}
						error={error.username}
					/>
					<TextInput
						label="Password:"
						value={loginState.password}
						password={true}
						setValue={setPassword}
						error={error.password}
					/>
					<Button
						text="LOG IN"
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
