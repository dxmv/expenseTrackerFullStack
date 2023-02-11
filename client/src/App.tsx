import React, { useEffect } from "react";
import "./app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { getToken } from "./utils/jwtTokenHandle";
import { useAppDispatch } from "./redux/store";
import { useLazyGetCurrentUserQuery } from "./redux/api/userSlice";
import { setUser } from "./redux/reducers/userSlice";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Nav />
				<Home />
			</>
		),
	},
	{
		path: "/log_in",
		element: <Login />,
	},
	{
		path: "/sign_up",
		element: <Register />,
	},
]);

function App() {
	const dispatch = useAppDispatch();
	const [trigger] = useLazyGetCurrentUserQuery();
	useEffect(() => {
		trigger()
			.unwrap()
			.then(res => dispatch(setUser(res.data)))
			.catch(e => {
				console.log(e);
			});
	}, []);

	return <RouterProvider router={router} />;
}

export default App;
