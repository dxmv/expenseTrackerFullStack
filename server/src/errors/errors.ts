import { IError } from "../types";

class HttpError implements IError {
	message: string;
	status: number;
	constructor(message: string, status: number) {
		this.message = message;
		this.status = status;
	}
}

export class InternalServerError extends HttpError {
	constructor() {
		super("Internal Server Error.", 500);
	}
}

export class NotFoundError extends HttpError {
	constructor(message: string) {
		super(message, 404);
	}
}

export class BadRequestError extends HttpError {
	constructor(message: string) {
		super(message, 400);
	}
}

export class ForbiddenError extends HttpError {
	constructor() {
		super("You don't have the permission to do that", 403);
	}
}

export default HttpError;
