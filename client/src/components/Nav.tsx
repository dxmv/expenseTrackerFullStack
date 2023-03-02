import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/store";

export default function Nav() {
	const user = useAppSelector(state => state.user.value);
	return (
		<div className="w-screen flex justify-between bg-transparent px-4 py-3 items-center fixed bg-myWhite">
			<img src={"/images/cashflow.png"} alt="logo" />
			<>
				{user ? (
					<div className="flex w-1/12 justify-between">
						<Link
							to={`/profile/${user._id}`}
							className="text-myBlack font-bold text-lg"
						>
							Expenses
						</Link>
						<Link
							to={`/profile/${user._id}`}
							className="text-myBlack font-bold text-lg"
						>
							Profile
						</Link>
					</div>
				) : (
					<div className="flex justify-between w-1/12">
						<Link to="/sign_up" className="text-myBlack font-bold text-lg">
							SIGN UP
						</Link>
						<Link to="/log_in" className="text-lightGreen font-bold text-lg">
							LOG IN
						</Link>
					</div>
				)}
			</>
		</div>
	);
}
