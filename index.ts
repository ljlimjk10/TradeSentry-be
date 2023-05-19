import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";

import { expressService as stockRoute } from "./routes/stock.route";

const port: Number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

const app: Express = express();

app.listen(port, () => {
	console.log(`listening from port ${port}`);
});

async function RunServer() {
	await stockRoute(app);
}

RunServer();
