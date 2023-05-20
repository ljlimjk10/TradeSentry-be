import { Application, Request, Response } from "express";

import {
	keywordsSearch,
	retriveStock,
	retriveStockQuote,
} from "../controllers/stock.controller";
import {
	errorResponseHandler,
	apiLimitExceededHandler,
} from "../middlewares/error-handling.middleware";

export const stockRoutes = {
	async listStocksFromKeywords(app: Application): Promise<void> {
		app.get("/stock/search", async (req: Request, res: Response) => {
			try {
				const keywords = req.query.keywords as string | undefined;
				if (keywords === undefined) {
					throw new Error("keyword missing");
				}
				const data = await keywordsSearch(keywords);
				apiLimitExceededHandler(data);
				return res.json({
					status: "Success",
					result: data,
				});
			} catch (error) {
				return errorResponseHandler(res, error);
			}
		});
	},
	async getStock(app: Application): Promise<void> {
		app.get("/stock/get", async (req: Request, res: Response) => {
			try {
				const symbol = req.query.symbol as string | undefined;
				if (symbol === undefined) {
					throw new Error("symbol missing");
				}
				const data = await retriveStock(symbol);
				apiLimitExceededHandler(data);
				return res.json({
					status: "Success",
					result: data,
				});
			} catch (error) {
				return errorResponseHandler(res, error);
			}
		});
	},
	async getStockQuote(app: Application): Promise<void> {
		app.get("/stock/quote", async (req: Request, res: Response) => {
			try {
				const symbol = req.query.symbol as string | undefined;
				if (symbol === undefined) {
					throw new Error("symbol missing");
				}
				const data = await retriveStockQuote(symbol);
				apiLimitExceededHandler(data);
				return res.json({
					status: "Success",
					result: data,
				});
			} catch (error) {
				return errorResponseHandler(res, error);
			}
		});
	},
};
