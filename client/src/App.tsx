import React from "react";
import "./app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

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
	return <RouterProvider router={router} />;
}

export default App;
