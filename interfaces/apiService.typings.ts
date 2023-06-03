export interface KeywordsSearch {
	bestMatches: KeywordsSearchResult[];
}

export interface KeywordsSearchResult {
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

export interface StockQuote {
	"Global Quote": StockQuoteResult;
}

export interface StockQuoteResult {
	"01. symbol": string;
	"02. open": string;
	"03. high": string;
	"04. low": string;
	"05. price": string;
	"06. volume": string;
	"07. latest trading day": string;
	"08. previous close": string;
	"09. change": string;
	"10. change percent": string;
}

export interface StockEarnings {
	symbol: string;
	annualEarnings: StockAnnualEarningsResult[];
	quarterlyEarnings: StockQuarterlyEarningsResult[];
}

export interface StockAnnualEarningsResult {
	fiscalDateEnding: string;
	reportedEPS: string;
}

export interface StockQuarterlyEarningsResult {
	fiscalDateEnding: string;
	reportedDate: string;
	reportedEPS: string;
	estimatedEPS: string;
	suprise: string;
	suprisePercentage: string;
}
