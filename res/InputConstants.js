//v5
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
		let data = {
			employeeNumber: "504483",
			bidPeriod:      "02JUL26",
			action:         "i",
		};
		
		return {
			data: data,
			insert: () => {
				$(".txt5").eq(0).val(data.employeeNumber);
				$(".txt5").eq(1).val(data.bidPeriod);
				$(".txt5").eq(2).val(data.action);
			},
		};
	}
	
    static get SCHS_HISTORY() {
		let data = {
			employeeNumber: "504483",
			bidPeriod:      "02JUL26",
			action:         "n",
		};
		
		return {
			data: data,
			insert: () => {
				$(".txt5").eq(0).val(data.employeeNumber);
				$(".txt5").eq(1).val(data.bidPeriod);
				$(".txt5").eq(2).val(data.action);
			},
		};
	}
	
    static get SCHS_HISTORY_ALTERNATE() {
		let data = {
			employeeNumber: "792096",
			bidPeriod:      "01NOV25",
			action:         "n",
		};
		
		return {
			data: data,
			insert: () => {
				$(".txt5").eq(0).val(data.employeeNumber);
				$(".txt5").eq(1).val(data.bidPeriod);
				$(".txt5").eq(2).val(data.action);
			},
		};
	}
	
    static get MOTS_DATA() {
		let data = {
			employeeNumber: "504483",
			bidPeriod:      "02JUL26",
			option:         "a",
		};
		
		return {
			data: data,
			insert: () => {
				$(".txt5").eq(0).val(data.employeeNumber);
				$(".txt5").eq(1).val(data.bidPeriod);
				$(".txt5").eq(2).val(data.option);
			},
		};
	}
	
    static get MOTV_DATA() {
		let data = {
			employeeNumber: "504483",
			bidPeriod:      "02JUL26",
		};
		
		return {
			data: data,
			insert: () => {
				$(".txt5").eq(0).val(data.employeeNumber);
				$(".txt5").eq(1).val(data.bidPeriod);
			},
		};
	}
	
    static get ROTS_HISTORY() {
		let data = {
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
		
		return {
			data: data,
			insert: () => {
				$(".txt5").eq(0).val(data.base);
				$(".txt5").eq(1).val(data.equipment);
				$(".txt5").eq(2).val(data.position);
				$(".txt5").eq(3).val(data.beginDate);
				$(".txt5").eq(4).val(data.endDate);
				$(".txt5").eq(5).val(data.reserveOpenTime);
				$(".txt5").eq(6).val(data.rotationNumber);
				$(".txt5").eq(7).val(data.rotationLengthStart);
				$(".txt5").eq(8).val(data.rotationLengthEnd);
				$(".txt5").eq(9).val(data.history);
				$(".txt5").eq(10).val(data.count1);
				$(".txt5").eq(11).val(data.count2);
				$(".txt5").eq(12).val(data.download);
				$(".txt5").eq(13).val(data.printerAddress);
			},
		};
	}
	
    static get RESERVE_OPEN_TIME() {
		let data = {
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
		
		return {
			data: data,
			insert: () => {
				$(".txt5").eq(0).val(data.base);
				$(".txt5").eq(1).val(data.equipment);
				$(".txt5").eq(2).val(data.position);
				$(".txt5").eq(3).val(data.beginDate);
				$(".txt5").eq(4).val(data.endDate);
				$(".txt5").eq(5).val(data.reserveOpenTime);
				$(".txt5").eq(6).val(data.rotationNumber);
				$(".txt5").eq(7).val(data.rotationLengthStart);
				$(".txt5").eq(8).val(data.rotationLengthEnd);
				$(".txt5").eq(9).val(data.history);
				$(".txt5").eq(10).val(data.count1);
				$(".txt5").eq(11).val(data.count2);
				$(".txt5").eq(12).val(data.download);
				$(".txt5").eq(13).val(data.printerAddress);
			},
		};
	}
	
    static get SC_AWDS() {
		let data = {
			category:  "atl330a",
			bidPeriod: "02JUN26",
			option:    "d",
		};
		
		return {
			data: data,
			insert: () => {
				$(".txt5").eq(0).val(data.category);
				$(".txt5").eq(1).val(data.bidPeriod);
				$(".txt5").eq(2).val(data.option);
			},
		};
	}
	
    static get RPH_DATA() {
		let data = {
			date:           "03JUL",
			base:           "ATL",
			rotationNumber: "A100",
			dupeNumber:     "",
		};
		
		return {
			data: data,
			insert: () => {
				$(".txt2").eq(0).val(data.date);
				$(".txt2").eq(1).val(data.base);
				$(".txt2").eq(2).val(data.rotationNumber);
				$(".txt2").eq(3).val(data.dupeNumber);
			},
		};
	}
	
    static get MPI_DATA() {
		let data = {
			base:           "ATL",
			rotationNumber: "A100",
			direction:      "p",
			date:           "",
		};
		
		return {
			data: data,
			insert: () => {
				$(".txt2").eq(0).val(data.base);
				$(".txt2").eq(1).val(data.rotationNumber);
				$(".txt2").eq(2).val(data.direction);
				$(".txt2").eq(3).val(data.date);
			},
		};
	}
	
    static get DTC_DATA() {
		let data = {
			base:      "atl",
			equipment: "7er",
			position:  "a",
			beginDate: "01may26",
			endDate:   "",
			download:  "N",
			scre:      "scre",
		};
		
		return {
			data: data,
			insert: () => {
				$(".txt5").eq(0).val(data.base);
				$(".txt5").eq(1).val(data.equipment);
				$(".txt5").eq(2).val(data.position);
				$(".txt5").eq(3).val(data.beginDate);
				$(".txt5").eq(4).val(data.endDate);
				$(".txt5").eq(5).val(data.download);
				$(".txt5").eq(6).val(data.scre);
			},
		};
	}
}
