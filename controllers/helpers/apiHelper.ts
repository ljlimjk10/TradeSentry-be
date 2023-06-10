import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

import {
	KeywordsSearch,
	StockQuote,
	StockEarnings,
	StockPricesResult,
} from "../../interfaces/apiService.typings";

import { apiLimitExceededHandler } from "../../controllers/helpers/errorHandlingHelper";

// Handles and makes external API calls.

const BASE_URL = "https://www.alphavantage.co";
const API_KEY = process.env.ALPHAVANTAGE_ACCESS_KEY;

const baseApi = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

/**
 * Method for getting list of stocks using keywords
 * @param keywords
 */
export async function keywordsSearch(keywords: string) {
	const params = {
		function: "SYMBOL_SEARCH",
		keywords: keywords,
		apikey: API_KEY,
	};
	const response = await baseApi.get<KeywordsSearch>("/query", {
		params,
	});
	apiLimitExceededHandler(response.data);
	const { data, status } = response;
	return data;
}

/**
 * Method for getting stock's financial informaton using stock's symbol
 * @param symbol
 */

export async function retriveStock(symbol: string) {
	const params = {
		function: "TIME_SERIES_DAILY_ADJUSTED",
		symbol: symbol,
		apikey: API_KEY,
	};
	const response = await baseApi.get("/query", { params });
	apiLimitExceededHandler(response.data);
	const { data, status } = response;
	return data;
}

/**
 * Method for getting stock's quote informaton using stock's symbol
 * @param symbol
 */

export async function retriveStockQuote(symbol: string) {
	const params = {
		function: "GLOBAL_QUOTE",
		symbol: symbol,
		apikey: API_KEY,
	};
	const response = await baseApi.get<StockQuote>("/query", { params });
	apiLimitExceededHandler(response.data);
	const { data, status } = response;
	return data;
}

/**
 * Method for getting all stock's prices using stock's symbol
 * @param symbol
 */
export async function retrieveAllPrices(symbol: string) {
	const params = {
		function: "TIME_SERIES_DAILY_ADJUSTED",
		symbol: symbol,
		outputsize: "full",
		apikey: API_KEY,
	};
	const response = await baseApi.get<StockPricesResult>("/query", { params });
	apiLimitExceededHandler(response.data);
	const { data, status } = response;
	return data;
}

/**
 * Method for getting stock's earnings informaton using stock's symbol
 * @param symbol
 */

export async function retriveStockEarnings(symbol: string) {
	const params = {
		function: "EARNINGS",
		symbol: symbol,
		apikey: API_KEY,
	};
	const response = await baseApi.get<StockEarnings>("/query", { params });
	apiLimitExceededHandler(response.data);
	const { data, status } = response;
	return data;
}
