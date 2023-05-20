import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

import { KeywordsSearch } from "../interfaces/stock.interface";

const BASE_URL = "https://www.alphavantage.co";

const baseApi = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export async function keywordsSearch(
	keywords: string
): Promise<KeywordsSearch> {
	try {
		const params = {
			function: "SYMBOL_SEARCH",
			keywords: keywords,
			apikey: process.env.ALPHAVANTAGE_ACCESS_KEY,
		};
		const response = await baseApi.get("/query", {
			params,
		});
		const { data, status } = response;
		return data;
	} catch (error) {
		throw error;
	}
}

export async function retriveStock(symbol: string) {
	try {
		const params = {
			function: "TIME_SERIES_DAILY_ADJUSTED",
			symbol: symbol,
			apikey: process.env.ALPHAVANTAGE_ACCESS_KEY,
		};
		const response = await baseApi.get("/query", { params });
		const { data, status } = response;
		return data;
	} catch (error) {
		throw error;
	}
}

export async function retriveStockQuote(symbol: string) {
	try {
		const params = {
			function: "GLOBAL_QUOTE",
			symbol: symbol,
			apikey: process.env.ALPHAVANTAGE_ACCESS_KEY,
		};
		const response = await baseApi.get("/query", { params });
		const { data, status } = response;
		return data;
	} catch (error) {
		throw error;
	}
}
