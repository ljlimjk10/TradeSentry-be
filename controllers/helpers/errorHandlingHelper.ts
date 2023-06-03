import { Response } from "express";

export function apiLimitExceededHandler(data: object) {
	if ("Note" in data) {
		throw new Error("Alpha Vantage API limit exceeded.");
	}
}

export function errorResponseHandler(res: Response, error: any) {
	return res.json({
		msg: error.message,
	});
}
