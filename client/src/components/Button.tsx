import React from "react";

export default function Button({
	text,
	className,
	onClick,
}: {
	text: string;
	className: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
}) {
	return (
		<button
			onClick={onClick}
			className={`uppercase px-4 py-3 text-lg font-bold ${className}`}
		>
			{text}
		</button>
	);
}
