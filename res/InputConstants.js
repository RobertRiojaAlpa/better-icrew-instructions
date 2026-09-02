//v7
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
				page: Pages.SCHS,
			},
			{
				name: "schsHistoryAlternate",
				value: this.SCHS_HISTORY_ALTERNATE,
				page: Pages.SCHS,
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
			data: {
				employeeNumber: "504483",
				bidPeriod:      "02JUL26",
				action:         "i",
			},
			insert: () => {
				$(".txt5").eq(0).val(InputConstants.SCHS_DATA.data.employeeNumber);
				$(".txt5").eq(1).val(InputConstants.SCHS_DATA.data.bidPeriod);
				$(".txt5").eq(2).val(InputConstants.SCHS_DATA.data.action);
			},
		};
	}
	
    static get SCHS_HISTORY() {
		return {
			data: {
				employeeNumber: "504483",
				bidPeriod:      "02JUL26",
				action:         "n",
			},
			insert: () => {
				$(".txt5").eq(0).val(InputConstants.SCHS_HISTORY.data.employeeNumber);
				$(".txt5").eq(1).val(InputConstants.SCHS_HISTORY.data.bidPeriod);
				$(".txt5").eq(2).val(InputConstants.SCHS_HISTORY.data.action);
			},
		};
	}
	
    static get SCHS_HISTORY_ALTERNATE() {
		return {
			data: {
				employeeNumber: "792096",
				bidPeriod:      "01NOV25",
				action:         "n",
			},
			insert: () => {
				$(".txt5").eq(0).val(InputConstants.SCHS_HISTORY_ALTERNATE.data.employeeNumber);
				$(".txt5").eq(1).val(InputConstants.SCHS_HISTORY_ALTERNATE.data.bidPeriod);
				$(".txt5").eq(2).val(InputConstants.SCHS_HISTORY_ALTERNATE.data.action);
			},
		};
	}
	
    static get MOTS_DATA() {
		return {
			data: {
				employeeNumber: "504483",
				bidPeriod:      "02JUL26",
				option:         "a",
			},
			insert: () => {
				$(".txt5").eq(0).val(InputConstants.MOTS_DATA.data.employeeNumber);
				$(".txt5").eq(1).val(InputConstants.MOTS_DATA.data.bidPeriod);
				$(".txt5").eq(2).val(InputConstants.MOTS_DATA.data.option);
			},
		};
	}
	
    static get MOTV_DATA() {
		return {
			data: {
				employeeNumber: "504483",
				bidPeriod:      "02JUL26",
			},
			insert: () => {
				$(".txt5").eq(0).val(InputConstants.MOTV_DATA.data.employeeNumber);
				$(".txt5").eq(1).val(InputConstants.MOTV_DATA.data.bidPeriod);
			},
		};
	}
	
    static get ROTS_HISTORY() {
		return {
			data: {
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
			},
			insert: () => {
				$(".txt5").eq(0 ).val(InputConstants.ROTS_HISTORY.data.base);
				$(".txt5").eq(1 ).val(InputConstants.ROTS_HISTORY.data.equipment);
				$(".txt5").eq(2 ).val(InputConstants.ROTS_HISTORY.data.position);
				$(".txt5").eq(3 ).val(InputConstants.ROTS_HISTORY.data.beginDate);
				$(".txt5").eq(4 ).val(InputConstants.ROTS_HISTORY.data.endDate);
				$(".txt5").eq(5 ).val(InputConstants.ROTS_HISTORY.data.reserveOpenTime);
				$(".txt5").eq(6 ).val(InputConstants.ROTS_HISTORY.data.rotationNumber);
				$(".txt5").eq(7 ).val(InputConstants.ROTS_HISTORY.data.rotationLengthStart);
				$(".txt5").eq(8 ).val(InputConstants.ROTS_HISTORY.data.rotationLengthEnd);
				$(".txt5").eq(9 ).val(InputConstants.ROTS_HISTORY.data.history);
				$(".txt5").eq(10).val(InputConstants.ROTS_HISTORY.data.count1);
				$(".txt5").eq(11).val(InputConstants.ROTS_HISTORY.data.count2);
				$(".txt5").eq(12).val(InputConstants.ROTS_HISTORY.data.download);
				$(".txt5").eq(13).val(InputConstants.ROTS_HISTORY.data.printerAddress);
			},
		};
	}
	
    static get RESERVE_OPEN_TIME() {
		return {
			data: {
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
			},
			insert: () => {
				$(".txt5").eq(0 ).val(InputConstants.RESERVE_OPEN_TIME.data.base);
				$(".txt5").eq(1 ).val(InputConstants.RESERVE_OPEN_TIME.data.equipment);
				$(".txt5").eq(2 ).val(InputConstants.RESERVE_OPEN_TIME.data.position);
				$(".txt5").eq(3 ).val(InputConstants.RESERVE_OPEN_TIME.data.beginDate);
				$(".txt5").eq(4 ).val(InputConstants.RESERVE_OPEN_TIME.data.endDate);
				$(".txt5").eq(5 ).val(InputConstants.RESERVE_OPEN_TIME.data.reserveOpenTime);
				$(".txt5").eq(6 ).val(InputConstants.RESERVE_OPEN_TIME.data.rotationNumber);
				$(".txt5").eq(7 ).val(InputConstants.RESERVE_OPEN_TIME.data.rotationLengthStart);
				$(".txt5").eq(8 ).val(InputConstants.RESERVE_OPEN_TIME.data.rotationLengthEnd);
				$(".txt5").eq(9 ).val(InputConstants.RESERVE_OPEN_TIME.data.history);
				$(".txt5").eq(10).val(InputConstants.RESERVE_OPEN_TIME.data.count1);
				$(".txt5").eq(11).val(InputConstants.RESERVE_OPEN_TIME.data.count2);
				$(".txt5").eq(12).val(InputConstants.RESERVE_OPEN_TIME.data.download);
				$(".txt5").eq(13).val(InputConstants.RESERVE_OPEN_TIME.data.printerAddress);
			},
		};
	}
	
    static get SC_AWDS() {
		return {
			data: {
				category:  "atl330a",
				bidPeriod: "02JUN26",
				option:    "d",
			},
			insert: () => {
				$(".txt5").eq(0).val(InputConstants.SC_AWDS.data.category);
				$(".txt5").eq(1).val(InputConstants.SC_AWDS.data.bidPeriod);
				$(".txt5").eq(2).val(InputConstants.SC_AWDS.data.option);
			},
		};
	}
	
    static get RPH_DATA() {
		return {
			data: {
				date:           "03JUL",
				base:           "ATL",
				rotationNumber: "A100",
				dupeNumber:     "",
			},
			insert: () => {
				$(".txt2").eq(0).val(InputConstants.RPH_DATA.data.date);
				$(".txt2").eq(1).val(InputConstants.RPH_DATA.data.base);
				$(".txt2").eq(2).val(InputConstants.RPH_DATA.data.rotationNumber);
				$(".txt2").eq(3).val(InputConstants.RPH_DATA.data.dupeNumber);
			},
		};
	}
	
    static get MPI_DATA() {
		return {
			data: {
				base:           "ATL",
				rotationNumber: "A100",
				direction:      "p",
				date:           "",
			},
			insert: () => {
				$(".txt2").eq(0).val(InputConstants.MPI_DATA.data.base);
				$(".txt2").eq(1).val(InputConstants.MPI_DATA.data.rotationNumber);
				$(".txt2").eq(2).val(InputConstants.MPI_DATA.data.direction);
				$(".txt2").eq(3).val(InputConstants.MPI_DATA.data.date);
			},
		};
	}
	
    static get DTC_DATA() {
		return {
			data: {
				base:      "atl",
				equipment: "7er",
				position:  "a",
				beginDate: "01may26",
				endDate:   "",
				download:  "N",
				scre:      "scre",
			},
			insert: () => {
				$(".txt5").eq(0).val(InputConstants.DTC_DATA.data.base);
				$(".txt5").eq(1).val(InputConstants.DTC_DATA.data.equipment);
				$(".txt5").eq(2).val(InputConstants.DTC_DATA.data.position);
				$(".txt5").eq(3).val(InputConstants.DTC_DATA.data.beginDate);
				$(".txt5").eq(4).val(InputConstants.DTC_DATA.data.endDate);
				$(".txt5").eq(5).val(InputConstants.DTC_DATA.data.download);
				$(".txt5").eq(6).val(InputConstants.DTC_DATA.data.scre);
			},
		};
	}
}
