import React from "react";

export default function TextInput({
	label,
	password,
	value,
	setValue,
}: {
	label: string;
	password?: boolean;
	value: string;
	setValue: (value: string) => void;
}) {
	return (
		<div className="flex flex-col mb-5">
			<label className="text-lg mb-1">{label}</label>
			<input
				type={password ? "password" : "text"}
				className="w-full"
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
		</div>
	);
}
