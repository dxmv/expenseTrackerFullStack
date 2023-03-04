import React from "react";

export default function TextArea({
	label,
	value,
	error,
	setValue,
}: {
	label: string;
	value: string;
	error: string;
	setValue: (value: string) => void;
}) {
	return (
		<div className="flex flex-col">
			<label>{label}</label>
			<textarea
				onChange={e => setValue(e.target.value)}
				value={value}
				rows={10}
				className="resize-none"
			/>
		</div>
	);
}
