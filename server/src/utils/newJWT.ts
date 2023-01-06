import jwt from "jsonwebtoken";
import { Document, WithId } from "mongodb";

const newJWT = (user: WithId<Document>): string => {
	return jwt.sign({ id: user._id, username: user.username }, "secret", {
		expiresIn: "1d",
	});
};

export default newJWT;
