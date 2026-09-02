//v3
class InputConstants {
	static ALL(pageFilter = null) {
		return [
			{
				name: "schsData",
				value: this.SCHS_DATA,
				page: Pages.SCHS,
			},
			{
				name: "schsHistory",
				value: this.SCHS_HISTORY,
				page: Pages.SCHS_HISTORY,
			},
			{
				name: "schsHistoryAlternate",
				value: this.SCHS_HISTORY_ALTERNATE,
				page: Pages.SCHS_HISTORY,
			},
			{
				name: "motsData",
				value: this.MOTS_DATA,
				page: Pages.MOTS,
			},
			{
				name: "motvData",
				value: this.MOTV_DATA,
				page: Pages.MOTV,
			},
			{
				name: "rotsHistory",
				value: this.ROTS_HISTORY,
				page: Pages.ROTS,
			},
			{
				name: "reserveOpenTime",
				value: this.RESERVE_OPEN_TIME,
				page: Pages.ROTS,
			},
			{
				name: "scAwds",
				value: this.SC_AWDS,
				page: Pages.RESERVE_OPEN_TIME,
			},
			{
				name: "rphData",
				value: this.RPH_DATA,
				page: Pages.RPH,
			},
			{
				name: "mpiData",
				value: this.MPI_DATA,
				page: Pages.MPI,
			},
			{
				name: "dtcData",
				value: this.DTC_DATA,
				page: Pages.DTC,
			},
		].filter(e => pageFilter === null || e.page === pageFilter);
	}
	
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
