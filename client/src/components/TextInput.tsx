import React from "react";

export default function TextInput({
	label,
	type = "text",
	value,
	error,
	setValue,
}: {
	label: string;
	type?: "password" | "text" | "number";
	value: string;
	error: string;
	setValue: (value: string) => void;
}) {
	return (
		<div className="flex flex-col mb-5">
			<label className="text-lg mb-1">{label}</label>
			<input
				type={type}
				className="w-full"
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<p>{error}</p>
		</div>
	);
}
