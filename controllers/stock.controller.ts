import { retriveStockQuote, retriveStockEarnings } from "./helpers/apiHelper";

/**
 * Method to compute the rating of stock based on financial year
 * @param
 */
export async function stockRatingYear(symbol: string) {
	const stockQuote = retriveStockQuote(symbol);
	const stockEarnings = retriveStockEarnings(symbol);
	const quoteResponse = await stockQuote;
	const earningsReponse = await stockEarnings;

	const stockPrice: number = +quoteResponse["Global Quote"]["05. price"];
	const reportedEarnings: number =
		+earningsReponse["annualEarnings"][0]["reportedEPS"];
	const priceEarningsRatio = stockPrice / reportedEarnings;
	return priceEarningsRatio;
}
