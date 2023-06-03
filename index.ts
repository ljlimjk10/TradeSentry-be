import * as dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";

import { stockRoutes } from "./routes/stock.route";

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

const app: Application = express();

app.listen(port, () => {
	console.log(`listening from port ${port}`);
});

async function RunServer() {
	await stockRoutes(app);
}

RunServer();
