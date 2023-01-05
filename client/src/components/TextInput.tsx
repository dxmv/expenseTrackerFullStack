import React from "react";

export default function TextInput({
	label,
	password,
}: {
	label: string;
	password?: boolean;
}) {
	return (
		<div className="flex flex-col mb-5">
			<label className="text-lg mb-1">{label}</label>
			<input type={password ? "password" : "text"} className="w-full" />
		</div>
	);
}
