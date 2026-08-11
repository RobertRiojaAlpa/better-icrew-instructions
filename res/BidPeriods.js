//v1
class BidPeriods {
    static get JAN() { return 1; }
    static get FEB() { return 2; }
    static get MAR() { return 3; }
    static get APR() { return 4; }
    static get MAY() { return 5; }
    static get JUN() { return 6; }
    static get JUL() { return 7; }
    static get AUG() { return 8; }
    static get SEP() { return 9; }
    static get OCT() { return 10; }
    static get NOV() { return 11; }
    static get DEC() { return 12; }

    static DATE_RANGES(year) { return [
        [new Date(year, 0, 1), new Date(year, 0, 30)],
        [new Date(year, 0, 31), new Date(year, 2, 1)],
        [new Date(year, 2, 2), new Date(year, 2, 31)],
        [new Date(year, 3, 1), new Date(year, 4, 1)],
        [new Date(year, 4, 2), new Date(year, 5, 1)],
        [new Date(year, 5, 2), new Date(year, 6, 1)],
        [new Date(year, 6, 2), new Date(year, 6, 31)],
        [new Date(year, 7, 1), new Date(year, 7, 30)],
        [new Date(year, 7, 31), new Date(year, 8, 30)],
        [new Date(year, 9, 1), new Date(year, 9, 31)],
        [new Date(year, 10, 1), new Date(year, 10, 30)],
        [new Date(year, 11, 1), new Date(year, 11, 31)],
    ]};

    static get3LetterCode(bidPeriod) { return DateUtils.$3_LETTER_CODES[bidPeriod - 1] }

    static getDateRange(bidPeriod, year) { return this.DATE_RANGES(year)[bidPeriod - 1] }

    static getDateRangeForDate(date) { return this.DATE_RANGES(date.getFullYear()).find(r => date >= r[0] && date <= r[1]) }

    static from3LetterCode(code) { return DateUtils.$3_LETTER_CODES.indexOf(code) + 1 }

    static fromDateMonth(month) { return month + 1 }

    static fromDate(date) { return this.DATE_RANGES(date.getFullYear()).findIndex(r => date >= r[0] && date <= r[1]) + 1 }

    static previous(bidPeriod) { return ((bidPeriod + 10) % 12) + 1 }

    static next(bidPeriod) { return (bidPeriod % 12) + 1 }
}