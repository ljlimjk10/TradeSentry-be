import { retriveStockEarnings, retrieveAllPrices } from "./helpers/apiHelper";

/**
 * Method to compute the rating of stock using P/E ratio
 * @param
 */

// TODO: Refactor to allow computation based on specified time periods
export async function stockRatingYear(symbol: string) {
	const stockPrices = await retrieveAllPrices(symbol);
	const stockEarnings = await retriveStockEarnings(symbol);
	const allAnnualEarnings = stockEarnings["annualEarnings"];

	const [{ fiscalDateEnding, reportedEPS }, ...previousAnnualEarnings] =
		allAnnualEarnings;
	const latestPriceEarningsRatio =
		+stockPrices["Time Series (Daily)"][fiscalDateEnding]["4. close"] /
		+reportedEPS;
	let sumPriceEarningsRatio = 0;
	let count = 0;

	for (const { fiscalDateEnding, reportedEPS } of previousAnnualEarnings) {
		const [year, month] = fiscalDateEnding.split("-");

		// Find the first date in stockPrices that matches the month and year
		const matchingDate = Object.keys(
			stockPrices["Time Series (Daily)"]
		).find((date) => {
			const [dateYear, dateMonth] = date.split("-");
			return dateYear === year && dateMonth === month;
		});

		if (matchingDate) {
			const priceEarningRatio =
				+stockPrices["Time Series (Daily)"][matchingDate]["4. close"] /
				+reportedEPS;
			sumPriceEarningsRatio += priceEarningRatio;
			count += 1;
		}
	}

	const avgPriceEarningsRatio = sumPriceEarningsRatio / count;

	const diffInRatio = latestPriceEarningsRatio - avgPriceEarningsRatio;
	if (diffInRatio > 0) {
		return {
			valuation: "Undervalued",
			diffInRatio: diffInRatio,
		};
	} else if (diffInRatio < 0) {
		return {
			valuation: "Overvalued",
			diffInRatio: diffInRatio,
		};
	} else {
		return {
			valuation: "Fairly Valued",
			diffInRatio: diffInRatio,
		};
	}
}
