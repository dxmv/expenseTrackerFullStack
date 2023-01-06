import { NextFunction, Request, Response } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
	const user: any = req.user;
	if (user.username === "Dima") {
		next();
	}
	next(Error("Unauthorized"));
};
export default isAdmin;
