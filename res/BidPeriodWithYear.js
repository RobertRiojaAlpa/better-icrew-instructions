//v7
class BidPeriodWithYear {
    constructor(bidPeriod, year) {
        this.bidPeriod = bidPeriod;
        this.year = year;
    }

    static fromDate(date) { return new BidPeriodWithYear(BidPeriod.fromDate(date), date.getFullYear()); }
	
	static now() { return new BidPeriodWithYear(BidPeriod.now(), new Date().getFullYear()); }

    getDateRange() { return this.bidPeriod.getDateRange(this.year); }

    getStartDate() { return this.bidPeriod.getStartDate(this.year); }

    getEndDate() { return this.bidPeriod.getEndDate(this.year); }

    getStartDatePilotFormat() { return DateUtils.dateToPilotFormat(this.bidPeriod.getStartDate(this.year)); }

    getEndDatePilotFormat() { return DateUtils.dateToPilotFormat(this.bidPeriod.getEndDate(this.year)); }

    year2Digit() { return this.year % 100; }

    previous() { return this.bidPeriod.value > BidPeriods.JAN.value ? new BidPeriodWithYear(this.bidPeriod.previous(), this.year) : new BidPeriodWithYear(BidPeriods.DEC, this.year - 1); }

    next() { return this.bidPeriod.value < BidPeriods.DEC.value ? new BidPeriodWithYear(this.bidPeriod.next(), this.year) : new BidPeriodWithYear(BidPeriods.JAN, this.year + 1); }
	
	equals(bidPeriodWithYear) { return this.bidPeriod.value === bidPeriodWithYear.bidPeriod.value && this.year === bidPeriodWithYear.year; }
}