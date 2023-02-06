// Imports
require("dotenv").config();
import { router as userRoutes } from "./routes/userRoute";
import { router as loginRoute } from "./routes/loginRoute";
import { router as expenseRoute } from "./routes/expenseRoute";
import { connect as dbConnect } from "./utils/database";

import passport from "passport";
import expressSession from "express-session";
import express from "express";
import passportConfig from "./utils/passportConfig";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// Connect to database and then start the app
dbConnect(() => {
	// Express middleware
	app.use(express.json());
	app.use(
		expressSession({
			secret: "secret",
			resave: false,
			saveUninitialized: false,
		})
	);
	// CORS
	app.use(
		cors({
			origin: "*",
			methods: "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE",
			allowedHeaders: "*",
			credentials: true,
		})
	);

	// Passport authorization
	app.use(cookieParser());
	app.use(passport.initialize());
	app.use(passport.session());
	passportConfig(passport);

	app.use("/users/", userRoutes);
	app.use("/expenses/", expenseRoute);
	app.use("/login", loginRoute);

	app.listen(8080, () => {
		console.log(`Server is listening on port ${process.env.PORT || 8080}`);
	});
});
