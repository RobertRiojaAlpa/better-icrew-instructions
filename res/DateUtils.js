//v2
class DateUtils {
    static get $3_LETTER_CODES() { return ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]; }

    static dateMonthTo3LetterCode(month) { return this.$3_LETTER_CODES[month] }

    static $3LetterCodeToDateMonth(code) { return this.$3_LETTER_CODES.findIndex(c => c.toLowerCase() === code.toLowerCase()) }

    static dateToPilotFormat(date) {
        return String(date.getDate()).padStart(2, "0") + this.dateMonthTo3LetterCode(date.getMonth()) + String(date.getFullYear()).slice(2);
    }

    static pilotFormatToDate(pilotFormat) {
        let year2Digit = pilotFormat.slice(-2);
        let month = this.$3LetterCodeToDateMonth(pilotFormat.slice(2, 5).toUpperCase());
        let day = pilotFormat.slice(0, 2);

        if(year2Digit === "" || month === -1 || day === "" || isNaN(new Date("20" + year2Digit + "-" + (month + 1) + "-" + day).getTime())) {
            return undefined;
        }

        return new Date("20" + year2Digit, month, day)
    }

    static getDateRange(start, end) {
        const arr = [];
        for(const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        return arr;
    }
}