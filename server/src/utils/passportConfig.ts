import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptions,
	VerifyCallback,
} from "passport-jwt";
import bcrypt from "bcrypt";
import { PassportStatic } from "passport";
import { getDb } from "./database";

const options: StrategyOptions = {
	secretOrKey: "secret",
	algorithms: ["RS256"],
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const strategy = new JwtStrategy(options, async (payload, cb) => {
	const db = getDb().collection("users");
	// Match user
	try {
		const user = await db.findOne({ _id: payload.sub });
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
