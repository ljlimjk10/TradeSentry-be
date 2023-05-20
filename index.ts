import * as dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";

import { stockRoutes } from "./routes/stock.route";

const port: Number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

const app: Application = express();

app.listen(port, () => {
	console.log(`listening from port ${port}`);
});

async function RunServer() {
	await stockRoutes.listStocksFromKeywords(app);
	await stockRoutes.getStock(app);
	await stockRoutes.getStockQuote(app);
}

RunServer();
