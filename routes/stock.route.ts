import { Application, Request, Response } from "express";

import { keywordSearch } from "../controllers/stock.controller";

export const expressService = async (app: Application) => {
	app.get("/keyword", async (req: Request, res: Response) => {
		try {
			const keywords = req.query.keywords as string | undefined;
			if (keywords === undefined) {
				throw new Error("keyword missing");
			} else {
				const data = await keywordSearch(keywords);
				return res.json({
					status: "Success",
					result: data,
				});
			}
		} catch (error) {
			throw error;
		}
	});
};
