//v3
class BidPeriodWithYear {
    constructor(bidPeriod, year) {
        this.bidPeriod = bidPeriod;
        this.year = year;
    }

    static fromDate(date) { return new BidPeriodWithYear(BidPeriods.DATE_RANGES(date.getFullYear()).findIndex(r => date >= r[0] && date <= r[1]) + 1, date.getFullYear()); }
	
	static now() {
		return this.fromDate(new Date(Date.now()));
	}

    getDateRange() { return BidPeriods.DATE_RANGES(this.year)[this.bidPeriod - 1] }

    year4Digit() { return this.year < 100 ? 2000 + this.year : this.year; }

    year2Digit() { return this.year < 100 ? this.year : this.year % 100; }

    static previous(bidPeriodWithYear) { return bidPeriodWithYear.bidPeriod > BidPeriods.JAN ? new BidPeriodWithYear(bidPeriodWithYear.bidPeriod - 1, bidPeriodWithYear.year) : new BidPeriodWithYear(BidPeriods.DEC, bidPeriodWithYear.year - 1); }

    static next(bidPeriodWithYear) { return bidPeriodWithYear.bidPeriod < BidPeriods.DEC ? new BidPeriodWithYear(bidPeriodWithYear.bidPeriod + 1, bidPeriodWithYear.year) : new BidPeriodWithYear(BidPeriods.JAN, bidPeriodWithYear.year + 1); }
}