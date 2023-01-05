import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
	return (
		<div className="w-screen flex justify-between bg-transparent px-4 py-3 items-center fixed">
			<img src={"/images/cashflow.png"} alt="logo" />
			<div className="flex justify-between w-1/12">
				<Link to="/sign_up" className="text-myBlack font-bold text-lg">
					SIGN UP
				</Link>
				<Link to="/log_in" className="text-lightGreen font-bold text-lg">
					LOG IN
				</Link>
			</div>
		</div>
	);
}
