export interface StockSearchKeywordResult {
	symbol: string;
	name: string;
	type: string;
	region: string;
	marketOpen: string;
	marketClose: string;
	timezone: string;
	currency: string;
	matchScore: string;
}

export interface StockSearchKeyword {
	bestMatches: StockSearchKeywordResult[];
}
