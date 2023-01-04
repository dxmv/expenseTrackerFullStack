import React from "react";

export default function Nav() {
	return (
		<div className="w-screen flex justify-between bg-transparent px-4 py-3 items-center fixed">
			<img src={"/images/cashflow.png"} alt="logo" />
			<div className="flex justify-between w-1/12">
				<p className="text-myBlack font-bold text-lg">SIGN UP</p>
				<p className="text-lightGreen font-bold text-lg">LOG IN</p>
			</div>
		</div>
	);
}
