//v2
class BidPeriod {
	//value is 1-indexed
	constructor(value) {
		this.value = value;
	}

    static from3LetterCode(code) { return new BidPeriod(DateUtils.$3_LETTER_CODES.findIndex(c => c.toLowerCase() === code.toLowerCase()) + 1); }

    static fromDateMonth(month) { return new BidPeriod(month + 1); }

    static fromDate(date) { return new BidPeriod(BidPeriods.DATE_RANGES(date.getFullYear()).findIndex(r => date >= r[0] && date <= r[1]) + 1); }
	
	static now() { return this.fromDate(new Date()); }
	
	toInt() { return this.value; };

    get3LetterCode() { return DateUtils.$3_LETTER_CODES[this.value - 1]; }

    getDateRange(year) { return BidPeriods.DATE_RANGES(year)[this.value - 1]; }

    getStartDate(year) { return BidPeriods.DATE_RANGES(year)[this.value - 1][0]; }

    getEndDate(year) { return BidPeriods.DATE_RANGES(year)[this.value - 1][1]; }

    getDateMonth() { return this.value - 1; }

    previous() { return new BidPeriod(((this.value + 10) % 12) + 1); }

    next() { return new BidPeriod((this.value % 12) + 1); }
	
	equals(bidPeriod) { return this.value === bidPeriod.value; }
}