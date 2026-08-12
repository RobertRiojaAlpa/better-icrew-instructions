//v2
class BidPeriods {
	static get JAN() { return new BidPeriod( 1); }
    static get FEB() { return new BidPeriod( 2); }
    static get MAR() { return new BidPeriod( 3); }
    static get APR() { return new BidPeriod( 4); }
    static get MAY() { return new BidPeriod( 5); }
    static get JUN() { return new BidPeriod( 6); }
    static get JUL() { return new BidPeriod( 7); }
    static get AUG() { return new BidPeriod( 8); }
    static get SEP() { return new BidPeriod( 9); }
    static get OCT() { return new BidPeriod(10); }
    static get NOV() { return new BidPeriod(11); }
    static get DEC() { return new BidPeriod(12); }

    static DATE_RANGES(year) { return [
        [new Date(year, 0,  1), new Date(year,  0, 30)],
        [new Date(year, 0, 31), new Date(year,  2,  1)],
        [new Date(year, 2,  2), new Date(year,  2, 31)],
        [new Date(year, 3,  1), new Date(year,  4,  1)],
        [new Date(year, 4,  2), new Date(year,  5,  1)],
        [new Date(year, 5,  2), new Date(year,  6,  1)],
        [new Date(year, 6,  2), new Date(year,  6, 31)],
        [new Date(year, 7,  1), new Date(year,  7, 30)],
        [new Date(year, 7, 31), new Date(year,  8, 30)],
        [new Date(year, 9,  1), new Date(year,  9, 31)],
        [new Date(year, 10, 1), new Date(year, 10, 30)],
        [new Date(year, 11, 1), new Date(year, 11, 31)],
    ]};

    static getDateRangeForDate(date) { return BidPeriods.DATE_RANGES(date.getFullYear()).find(r => date >= r[0] && date <= r[1]) }

    static getStartDateForDate(date) { return BidPeriods.DATE_RANGES(date.getFullYear()).find(r => date >= r[0] && date <= r[1])[0] }

    static getEndDateForDate(date) { return BidPeriods.DATE_RANGES(date.getFullYear()).find(r => date >= r[0] && date <= r[1])[1] }
}