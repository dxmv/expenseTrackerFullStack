require("dotenv").config();

import { router as userRoutes } from "./routes/userRoute";
import bodyParser from "body-parser";
import { connect as dbConnect } from "./utils/database";

const express = require("express");
const app = express();

app.use(express.json());

dbConnect(() => {
	app.listen(8080, () => {
		console.log(`Server is listening on port ${process.env.PORT || 8080}`);
	});
});

app.use("/users/", userRoutes);
