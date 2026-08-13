//v3
class Pages {
    static get UNKNOWN() { return "Unknown"; }

    static get PILOT_MAIN_MENU() { return "Pilot main menu"; }
    static get PILOT_CURRENCY_ALERT() { return "Pilot currency alert"; }
    static get PILOT_QDLA() { return "Pilot quarterly distance learning advisory"; }
    static get PILOT_AURVR() { return "Pilot add/update recency volunteer requests"; }
    static get PILOT_DPPS() { return "Display pilot pay statement"; }

    static get MAIN_MENU() { return "Main menu"; }
    static get LOGIN() { return "Login"; }
    static get LOGOUT() { return "Logout"; }
    static get LOCKED_OUT() { return "Locked out"; }

    static get SCHS() { return "SCHS"; }
    static get SCHS_DATA() { return "SCHS data"; }
    static get SCHS_HISTORY() { return "SCHS history" }
    static get SCHS_HISTORY_SCROLL_MESSAGE() { return "SCHS history scroll message" }
    static get MUST_BE_N_OR_L() { return "Must be N or L"; }

    static get ROTATION() { return "Rotation"; }

    static get MOTS() { return "MOTS"; }
    static get MOTS_DATA() { return "MOTS data"; }

    static get MOTV() { return "MOTV"; }
    static get MOTV_DATA() { return "MOTV data"; }

    static get SICK() { return "Sick"; }
    static get SICK_OCCURRENCES() { return "Sick occurrences"; }

    static get PCS() { return "PCS"; }
    static get $23M7() { return "23M7"; }
    static get $23M7_DATA() { return "23M7 data"; }

    static get PRES() { return "PRES"; }

    static get ROTS() { return "ROTS"; }
    static get ROTS_HISTORY() { return "ROTS history"; }

    static get RESERVE_OPEN_TIME() { return "Reserve open time"; }
    static get SC_AWDS() { return "SC-AWDS"; }

    static get VTSS() { return "VTSS"; }

    static get UDD() { return "UDD"; }

    static get SLP() { return "SLP"; }
    static get SWAP() { return "SWAP"; }
    static get LEAV() { return "LEAV"; }
    static get DTY() { return "DTY"; }

    static get RS_RR() { return "RS/RR"; }

    static get RPH() { return "RPH"; }
    static get RPH_DATA() { return "RPH data"; }

    static get MPI() { return "MPI"; }
    static get MPI_DATA() { return "MPI data"; }

    static get LAY_IOE() { return "LAY-IOE"; }
    static get PMR() { return "PMR"; }
    static get SC_SKED() { return "SC-SKED"; }
    static get CONF() { return "CONF"; }
    static get FXDAY() { return "FXDAY"; }
    static get LAYOVER() { return "LAYOVER"; }
    static get NQPS() { return "NQPS"; }

    static get OBWS() { return "OBWS"; }
    static get PSCR() { return "PSCR"; }
    static get INVERSE() { return "INVERSE"; }
    static get MAX_SC() { return "MAX-SC"; }
    static get SCHSOME() { return "SCHSOME"; }

    static get DTC() { return "DTC"; };
    static get DTC_CONFIRM() { return "DTC confirm"; }
    static get DTC_DATA() { return "DTC data"; }

    static isPilotMenuAdvisory(page) {
        return page === Pages.PILOT_CURRENCY_ALERT
               || page === Pages.PILOT_QDLA
               || page === Pages.PILOT_AURVR
               || page === Pages.PILOT_DPPS;
    }
	
	static isSkippable(page) {
		return page === Pages.SCHS_HISTORY_SCROLL_MESSAGE
		       || page === Pages.DTC;
	}

    static hasCompile(page) {
        return page === Pages.SCHS_DATA
               || page === Pages.SCHS_HISTORY
               || page === Pages.ROTATION
               || page === Pages.MOTS_DATA
               || page === Pages.MOTV_DATA
               || page === Pages.SICK_OCCURRENCES
               || page === Pages.ROTS_HISTORY
               || page === Pages.RPH_DATA
               || page === Pages.MPI_DATA
               || page === Pages.$23M7_DATA;
    }

    static hasCompileMany(page) {
        return page === Pages.SCHS;
    }

    static hasDateSearch(page) {
        return page === Pages.DTC_DATA || page === Pages.SCHS_HISTORY;
    }

    static hasOpenInNewTab(page) {
        return page === Pages.SCHS_DATA || page === Pages.ROTATION;
    }

    static hasBidPeriodInput(page) {
        return page === Pages.SCHS
               || page === Pages.MOTS
               || page === Pages.MOTV
               || page === Pages.PRES
               || page === Pages.VTSS
               || page === Pages.SLP
               || page === Pages.SWAP
               || page === Pages.LEAV
               || page === Pages.DTY
               || page === Pages.RS_RR
               || page === Pages.LAY_IOE
               || page === Pages.PMR
               || page === Pages.SC_SKED
               || page === Pages.CONF
               || page === Pages.FXDAY
               || page === Pages.LAYOVER
               || page === Pages.NQPS
               || page === Pages.OBWS
               || page === Pages.PSCR
               || page === Pages.INVERSE
               || page === Pages.MAX_SC
               || page === Pages.SCHSOME
               || page === Pages.$23M7;
    }

    static hasBidPeriodEndInput(page) {
        return page === Pages.VTSS;
    }

    static isContentPage(menu, page) {
        return menu === Menus.ALPA_MENU
               && !Pages.isPilotMenuAdvisory(page)
               && page !== Pages.MAIN_MENU
               && page !== Pages.LOGIN
               && page !== Pages.LOGOUT
               && page !== Pages.LOCKED_OUT
               && page !== Pages.MUST_BE_N_OR_L;
    }

    static clickMenu(menuIndex, itemIndex) {
        let APMenusWindow = this.getAPMenusWindow(window.top);

        if(APMenusWindow) {
            APMenusWindow.APMenus[menuIndex].mItems[itemIndex].onClick();
        } else {
            console.error("Better: Couldn't find APMenus");
        }
    }

    static getAPMenusWindow(currentWindow) {
        if(currentWindow.APMenus) {
            return currentWindow;
        }

        for(let i = 0; i < currentWindow.length; i++) {
            let recursiveWindow = this.getAPMenusWindow(currentWindow[i]);

            if(recursiveWindow) {
                return recursiveWindow;
            }
        }

        return undefined;
    }

    static getRefreshUrl() {
        if(window.location.href.indexOf("icrewaws.delta.com") !== -1) {
            return "https://icrewaws.delta.com/icrewSSO.html";
        } else if(window.location.href.indexOf("icrew.delta.com") !== -1) {
            return "https://icrew.delta.com/icrewSSO.html";
        } else {
            console.error("Better: Couldn't determine URL - " + window.location.href);
            return "";
        }
    }
}