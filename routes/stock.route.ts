import { Application, Request, Response } from "express";

import {
	keywordsSearch,
	retriveStock,
	retriveStockQuote,
} from "../controllers/helpers/apiHelper";
import { errorResponseHandler } from "../controllers/helpers/errorHandlingHelper";
import { stockRatingYear } from "../controllers/stock.controller";

export async function stockRoutes(app: Application): Promise<void> {
	app.get("/stock/search", async (req: Request, res: Response) => {
		try {
			const keywords = req.query.keywords as string | undefined;
			if (keywords === undefined) {
				throw new Error("keyword missing");
			}
			const data = await keywordsSearch(keywords);
			return res.json({
				status: "Success",
				result: data,
			});
		} catch (error) {
			return errorResponseHandler(res, error);
		}
	});
	app.get("/stock/get", async (req: Request, res: Response) => {
		try {
			const symbol = req.query.symbol as string | undefined;
			if (symbol === undefined) {
				throw new Error("symbol missing");
			}
			const data = await retriveStock(symbol);
			return res.json({
				status: "Success",
				result: data,
			});
		} catch (error) {
			return errorResponseHandler(res, error);
		}
	});
	app.get("/stock/quote", async (req: Request, res: Response) => {
		try {
			const symbol = req.query.symbol as string | undefined;
			if (symbol === undefined) {
				throw new Error("symbol missing");
			}
			const data = await retriveStockQuote(symbol);
			return res.json({
				status: "Success",
				result: data,
			});
		} catch (error) {
			return errorResponseHandler(res, error);
		}
	});
	app.get("/stock/rating", async (req: Request, res: Response) => {
		try {
			const symbol = req.query.symbol as string | undefined;
			if (symbol === undefined) {
				throw new Error("symbol missing");
			}
			const data = await stockRatingYear(symbol);
			return res.json({
				status: "Success",
				result: data,
			});
		} catch (error) {
			return errorResponseHandler(res, error);
		}
	});
}
