import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

import { StockSearchKeyword } from "../interfaces/stock.interface";

const BASE_URL = "https://www.alphavantage.co";

const baseApi = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export async function keywordSearch(keywords: string) {
	try {
		const params = {
			function: "SYMBOL_SEARCH",
			keywords: keywords,
			apikey: process.env.ALPHAVANTAGE_ACCESS_KEY,
		};
		const response = await baseApi.get<StockSearchKeyword>("/query", {
			params,
		});
		const { data, status } = response;
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
