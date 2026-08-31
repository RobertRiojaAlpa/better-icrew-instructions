//v2
class InputConstants {
    static get SCHS_DATA() {
		return {
			employeeNumber: "504483",
			bidPeriod:      "02JUL26",
			action:         "i",
		};
	}
	
    static get SCHS_HISTORY() {
		return {
			employeeNumber: "504483",
			bidPeriod:      "02JUL26",
			action:         "n",
		};
	}
	
    static get SCHS_HISTORY_ALTERNATE() {
		return {
			employeeNumber: "792096",
			bidPeriod:      "01NOV25",
			action:         "n",
		};
	}
	
    static get MOTS_DATA() {
		return {
			employeeNumber: "504483",
			bidPeriod:      "02JUL26",
			option:         "a",
		};
	}
	
    static get MOTV_DATA() {
		return {
			employeeNumber: "504483",
			bidPeriod:      "02JUL26",
		};
	}
	
    static get ROTS_HISTORY() {
		return {
			base:                "atl",
			equipment:           "330",
			position:            "a",
			beginDate:           "02JUN26",
			endDate:             "",
			reserveOpenTime:     "n",
			rotationNumber:      "a102",
			rotationLengthStart: "",
			rotationLengthEnd:   "",
			history:             "y",
			count1:              "",
			count2:              "",
			download:            "",
			printerAddress:      "",
		};
	}
	
    static get RESERVE_OPEN_TIME() {
		return {
			base:                "atl",
			equipment:           "330",
			position:            "a",
			beginDate:           "",
			endDate:             "",
			reserveOpenTime:     "y",
			rotationNumber:      "a102",
			rotationLengthStart: "",
			rotationLengthEnd:   "",
			history:             "",
			count1:              "",
			count2:              "",
			download:            "",
			printerAddress:      "",
		};
	}
	
    static get SC_AWDS() {
		return {
			category:  "atl330a",
			bidPeriod: "02JUN26",
			option:    "d",
		};
	}
	
    static get RPH_DATA() {
		return {
			date:           "03JUL",
			base:           "ATL",
			rotationNumber: "A100",
			dupeNumber:     "",
		};
	}
	
    static get MPI_DATA() {
		return {
			base:           "ATL",
			rotationNumber: "A100",
			direction:      "p",
			date:           "",
		};
	}
	
    static get DTC_DATA() {
		return {
			base:      "atl",
			equipment: "7er",
			position:  "a",
			beginDate: "01may26",
			endDate:   "",
			download:  "N",
			scre:      "scre",
		};
	}
}