import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import HttpError from "./errors";

const errorHandle = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof HttpError) {
		res
			.status(error.status)
			.json({ success: false, data: { message: error.message } });
		return;
	}
	res
		.status(500)
		.json({ success: false, data: { message: "Something broke" } });
};

export default errorHandle;
