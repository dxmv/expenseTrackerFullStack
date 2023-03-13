import React from "react";

export default function Button({
	text,
	className,
	onClick,
	disabled,
}: {
	text: string;
	className: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
	disabled?: boolean;
}) {
	return (
		<button
			onClick={onClick}
			className={`uppercase px-4 py-3 text-lg font-bold ${className}`}
			disabled={disabled}
		>
			{text}
		</button>
	);
}
