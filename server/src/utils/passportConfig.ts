import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptions,
} from "passport-jwt";
import { PassportStatic } from "passport";
import { getDb } from "./database";
import { ObjectId } from "mongodb";
import userController from "../controllers/userController";

const options: StrategyOptions = {
	secretOrKey: "secret",
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const strategy = new JwtStrategy(options, async (payload, cb) => {
	const db = getDb().collection("users");
	// Match user
	try {
		const user = await userController.getUserById(db, payload.id);
		if (user) {
			return cb(null, user);
		}
		return cb(null, false);
	} catch (err) {
		return cb(err, false);
	}
});

const verify = (passport: PassportStatic) => {
	passport.use(strategy);
};

export default verify;
