//v8
class PageResolver {
    static isOnPilotMainMenuPage(menu) {
        return menu === Menus.PILOT_MENU;
    }

    static isOnPilotCurrencyAlertPage(menu) {
        return menu === Menus.NONE
               && $(".fra1").first().children().first().val() === "Currency Alert";
    }

    static isOnPilotQdlaPage(menu) {
        return menu === Menus.NONE
               && $(".fra1").first().children().first().val() === "Quarterly Distance Learning Advisory";
    }

    static isOnPilotAurvrPage(menu) {
        return menu === Menus.NONE
               && $(".fra1").first().children().first().val() === "Add/Update Recency Volunteer Requests";
    }

    static isOnPilotDppsPage(menu) {
        return menu === Menus.PILOT_MENU
               && $(".btn9").first().val() === "Display Pilot Pay Statement";
    }

    static isOnLoginPage(menu) {
        return menu === Menus.NONE
               && $("#Frame_MainContainer")[0]?.innerText?.trim() === "To change your password CLICK HERE";
    }

    static isOnLogoutPage(menu) {
        return menu === Menus.NONE
               && document.body.innerHTML.replace(/\r?\n|\r/g, " ").includes("Please close this window to complete the logoff process.");
    }

    static isOnLockedOutPage(menu) {
        return menu === Menus.NONE
               && document.body.innerHTML.replace(/\r?\n|\r/g, " ").includes("Your iCrew account has been locked.");
    }

    static isOnMainMenuPage(menu) {
        return menu === Menus.ALPA_MENU
               && $("#Frame").children().first().val() === "iCrew for ALPA";
    }

    static isOnSchsPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("CHANGE/DISPLAY PILOT SCHEDULE")
               && document.body.innerHTML.includes("(SCHC)");
    }

    static isOnSchsDataPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("DTE OR DES OFF  STAT  ROT1 D R1 STAT  ROT2 D R2 RPT1 RPT2 E/L R CALL BLKN DTE");
    }

    static isOnSchsHistoryPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("PILOT SCHEDULE HISTORY")
			   && $(".btn9").length === 4;
    }

    static isOnSchsHistoryScrollMessagePage(menu) {
        return menu === Menus.ALPA_MENU
               && $(".tbl1").eq(0).text().includes("UNABLE TO USE SCROLL FUNCTION")
               && $(".tbl1").eq(0).text().includes("HIT ENTER TO VIEW SCHEDULE HISTORY");
    }

    static async isOnSchsHistoryAlternatePage(menu) {
        return menu === Menus.ALPA_MENU
               && (
			       //This is the previous page since it hasn't been updated yet
                   await GMSettings.PAGE_CURRENT.get() === Pages.SCHS_HISTORY_SCROLL_MESSAGE
                   || await GMSettings.PAGE_CURRENT.get() === Pages.SCHS_HISTORY_ALTERNATE
			   ) && (
			       $("#frmHiddenControls").next().text().includes("BY:")
			       || $(".tbl1").text().includes("BY:")
			   ) && $(".btn9").length === 0;
    }

    static isOnMustBeNOrLPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("MUST BE ' ', 'N' OR 'L'");
    }

    static isOnRotationPage(menu) {
        return menu === Menus.ALPA_MENU
               && $(".txt4[type=password]").length === 1;
    }

    static isOnMotsPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("DISPLAY MONTHLY TIME DATA");
    }

    static isOnMotsDataPage(menu) {
        return menu === Menus.ALPA_MENU
               && $("#Frame").children().first().val() === "Monthly Time Data";
    }

    static isOnMotvPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("DISPLAY USAGE AND BALANCES FOR VACATION/BANK/PAYBACK DAYS")
               && document.body.innerHTML.includes("TO IGNORE THIS SCREEN, PRESS 'PF1' FOR MAIN MENU OR 'PF2' FOR PREVIOUS MENU");
    }

    static async isOnMotvDataPage(menu) {
        return menu === Menus.ALPA_MENU
               && (
                   (
                       document.body.innerHTML.includes("DISPLAY USAGE AND BALANCES FOR VACATION/BANK/PAYBACK DAYS")
                       && document.body.innerHTML.includes("NAME:")
                   ) || (
                       document.body.innerHTML.includes("END OF DISPLAY - PRESS ENTER TO RETURN TO PREVIOUS MENU")
                       //This is the previous page since it hasn't been updated yet
                       && await GMSettings.PAGE_CURRENT.get() === Pages.MOTV_DATA
                   )
               )
    }

    static isOnSickPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("Display Sick Time Usage And Balances");
    }

    static isOnSickOccurrencesPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("UPDATE PILOT SICK OCCURRENCE DATA");
    }

    static isOnPcsPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("OPEN TIME - PCS");
    }

    static isOn23M7Page(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("DISPLAY 23M7 DATA");
    }

    static isOn23M7DataPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("23M7 LOGS FOR BID PERIOD");
    }

    static isOnPresPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnPcsPage(menu)
               && document.body.innerHTML.includes("DISPLAY PILOT RESERVE LEVELS")
               && document.body.innerHTML.includes("PRESM");
    }

    static isOnRotsPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnPcsPage(menu)
               && document.body.innerHTML.includes("DISPLAY ROTATION OPEN TIME FILE");
    }

    static isOnRotsHistoryPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("ROTATION OPEN TIME HISTORY");
    }

    static isOnReserveOpenTimePage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnRotsPage(menu)
               && document.body.innerHTML.includes("RESERVE OPEN TIME");
    }

    static isOnScAwdsPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("DISPLAY SC AWARDS/ASSIGNMENTS");
    }

    static isOnVtssPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("DISPLAY V.T.S.");
    }

    static isOnUddPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("CHANGE / DISPLAY DUE DATE INFORMATION");
    }

    static isOnSlpPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnPcsPage(menu)
               && document.body.innerHTML.includes("PILOT SLIP REQUESTS");
    }

    static isOnSwapPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnPcsPage(menu)
               && document.body.innerHTML.includes("SWAP WITH POT");
    }

    static isOnLeavPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnPcsPage(menu)
               && document.body.innerHTML.includes("LEAVE REQUEST")
               && document.body.innerHTML.includes("(LEAV)");
    }

    static isOnDtyPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("PRINT SUMMARY OF DUTY PERIODS OF ASSIGNMENTS")
               && document.body.innerHTML.includes("FOR A SPECIFIED BID PERIOD BEGIN DATE");
    }

    static isOnRsRrPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("PRODUCE COUNT OF PILOTS WITH EXTENDED/SHORTENED ROTATIONS")
               && document.body.innerHTML.includes("(I.E. THOSE PILOTS WITH 'RR' AND 'RS' DATE FRAME ORIGIN CODES)")
               && document.body.innerHTML.includes("SPILLOVER ROTATIONS ARE COUNTED IN BID PERIOD ASSOCIATED WITH ROTATION DATE");
    }

    static isOnRphPage(menu) {
        return menu === Menus.ALPA_MENU
               && $(".lbl8").eq(1).text().trim().length <= 1
               && $("#Frame").children().first().val() === "Historical Rotation Information (For Pilots)";
    }

    static isOnRphDataPage(menu) {
        return menu === Menus.ALPA_MENU
               && $(".lbl8").eq(1).text().trim().length > 1
               && $("#Frame").children().first().val() === "Historical Rotation Information (For Pilots)";
    }

    static isOnMpiPage(menu) {
        return menu === Menus.ALPA_MENU
               && $(".lbl8").eq(1).text().trim().length <= 1
               && $("#Frame").children().first().val() === "Master Pilot Pairing - Use C/N/F/P. Or for created rotations, use date";
    }

    static isOnMpiDataPage(menu) {
        return menu === Menus.ALPA_MENU
               && $(".lbl8").eq(1).text().trim().length > 1
               && $("#Frame").children().first().val() === "Master Pilot Pairing - Use C/N/F/P. Or for created rotations, use date";
    }

    static isOnDtcConfirmPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("To see report online, type SCRE else press");
    }

    static isOnLayIoePage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("REPORT OF ALL IOE DUTY PERIODS THAT LAYOVER IN DOMICILE");
    }

    static isOnPmrPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("PRINT PILOT MONTHLY RESERVE REPORT");
    }

    static isOnScSkedPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("PILOT SHORT CALL COUNTS BY CATEGORY AND BID PERIOD");
    }

    static isOnConfPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("PRINT REGULAR LINE PILOTS")
               && document.body.innerHTML.includes("WITH A GREEN SLIP/INVERSE ASSIGNMENT CONFLICT")
               && document.body.innerHTML.includes("FOR A SPECIFIED BID PERIOD BEGIN DATE");
    }

    static isOnFxdayPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("REPORT FLOATING XDAY DUE");
    }

    static isOnLayoverPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("REPORT OF ALL DUTY PERIODS THAT LAYOVER IN DOMICILE");
    }

    static isOnNqpsPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("NON-QUALIFIED PILOTS")
               && document.body.innerHTML.includes("(NQPS)");
    }

    static isOnObwsPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("OUT OF BASE WHITE SLIP REPORT")
               && document.body.innerHTML.includes("(OBWS)");
    }

    static isOnPscrPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("PRODUCE REPORT OF PILOTS WITH SPECIFIED SCHEDULE CODES")
               && document.body.innerHTML.includes("TO PRODUCE REPORT OF PILOTS WITH SPECIFIED SCHEDULES CODES, ENTER:");
    }

    static isOnInversePage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("PRINT REGULAR OR RESERVE LINE PILOTS WITH AN INVERSE ASSIGNMENT")
               && document.body.innerHTML.includes("FOR A SPECIFIED BID PERIOD BEGIN DATE");
    }

    static isOnMaxScPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("COUNT OF ALL SHORT CALLS THAT EXCEED MAXIMUM ALLOWED");
    }

    static isOnSchsomePage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.includes("SCHEDULES FOR REQUESTED PILOTS");
    }

    static isOnDtcPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnDtcConfirmPage(menu)
               && !PageResolver.isOnPcsPage(menu)
               && document.body.innerHTML.includes("DAILY TRIP COVERAGE");
    }

    static isOnDtcDataPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnDtcConfirmPage(menu)
               && document.body.innerHTML.includes("Daily Trip Coverage");
    }

    static ALL() { return Object.entries(Object.getOwnPropertyDescriptors(PageResolver))
                                .filter(([key, descriptor]) => descriptor.value?.name?.startsWith("is") ?? false)
                                .map(([key]) => PageResolver[key]); }

    static async getPage(menu) {
        if(PageResolver.isOnPilotMainMenuPage(menu)) {
            return Pages.PILOT_MAIN_MENU;
        }

        if(PageResolver.isOnPilotCurrencyAlertPage(menu)) {
            return Pages.PILOT_CURRENCY_ALERT;
        }

        if(PageResolver.isOnPilotQdlaPage(menu)) {
            return Pages.PILOT_QDLA;
        }

        if(PageResolver.isOnPilotAurvrPage(menu)) {
            return Pages.PILOT_AURVR;
        }

        if(PageResolver.isOnPilotDppsPage(menu)) {
            return Pages.PILOT_DPPS;
        }

        if(PageResolver.isOnMainMenuPage(menu)) {
            return Pages.MAIN_MENU;
        }

        if(PageResolver.isOnLoginPage(menu)) {
            return Pages.LOGIN;
        }

        if(PageResolver.isOnLogoutPage(menu)) {
            return Pages.LOGOUT;
        }

        if(PageResolver.isOnLockedOutPage(menu)) {
            return Pages.LOCKED_OUT;
        }

        if(PageResolver.isOnSchsPage(menu)) {
            return Pages.SCHS;
        }

        if(PageResolver.isOnSchsDataPage(menu)) {
            return Pages.SCHS_DATA;
        }

        if(PageResolver.isOnSchsHistoryPage(menu)) {
            return Pages.SCHS_HISTORY;
        }

        if(PageResolver.isOnSchsHistoryScrollMessagePage(menu)) {
            return Pages.SCHS_HISTORY_SCROLL_MESSAGE;
        }

        if(PageResolver.isOnSchsHistoryAlternatePage(menu)) {
            return Pages.SCHS_HISTORY_ALTERNATE;
        }

        if(PageResolver.isOnMustBeNOrLPage(menu)) {
            return Pages.MUST_BE_N_OR_L;
        }

        if(PageResolver.isOnRotationPage(menu)) {
            return Pages.ROTATION;
        }

        if(PageResolver.isOnMotsPage(menu)) {
            return Pages.MOTS;
        }

        if(PageResolver.isOnMotsDataPage(menu)) {
            return Pages.MOTS_DATA;
        }

        if(PageResolver.isOnMotvPage(menu)) {
            return Pages.MOTV;
        }

        if(await PageResolver.isOnMotvDataPage(menu)) {
            return Pages.MOTV_DATA;
        }

        if(PageResolver.isOnSickPage(menu)) {
            return Pages.SICK;
        }

        if(PageResolver.isOnSickOccurrencesPage(menu)) {
            return Pages.SICK_OCCURRENCES;
        }

        if(PageResolver.isOnPcsPage(menu)) {
            return Pages.PCS;
        }

        if(PageResolver.isOn23M7Page(menu)) {
            return Pages.$23M7;
        }

        if(PageResolver.isOn23M7DataPage(menu)) {
            return Pages.$23M7_DATA;
        }

        if(PageResolver.isOnPresPage(menu)) {
            return Pages.PRES;
        }

        if(PageResolver.isOnRotsPage(menu)) {
            return Pages.ROTS;
        }

        if(PageResolver.isOnRotsHistoryPage(menu)) {
            return Pages.ROTS_HISTORY;
        }

        if(PageResolver.isOnReserveOpenTimePage(menu)) {
            return Pages.RESERVE_OPEN_TIME;
        }

        if(PageResolver.isOnScAwdsPage(menu)) {
            return Pages.SC_AWDS;
        }

        if(PageResolver.isOnVtssPage(menu)) {
            return Pages.VTSS;
        }

        if(PageResolver.isOnUddPage(menu)) {
            return Pages.UDD;
        }

        if(PageResolver.isOnSlpPage(menu)) {
            return Pages.SLP;
        }

        if(PageResolver.isOnSwapPage(menu)) {
            return Pages.SWAP;
        }

        if(PageResolver.isOnLeavPage(menu)) {
            return Pages.LEAV;
        }

        if(PageResolver.isOnDtyPage(menu)) {
            return Pages.DTY;
        }

        if(PageResolver.isOnRsRrPage(menu)) {
            return Pages.RS_RR;
        }

        if(PageResolver.isOnRphPage(menu)) {
            return Pages.RPH;
        }

        if(PageResolver.isOnRphDataPage(menu)) {
            return Pages.RPH_DATA;
        }

        if(PageResolver.isOnMpiPage(menu)) {
            return Pages.MPI;
        }

        if(PageResolver.isOnMpiDataPage(menu)) {
            return Pages.MPI_DATA;
        }

        if(PageResolver.isOnLayIoePage(menu)) {
            return Pages.LAY_IOE;
        }

        if(PageResolver.isOnPmrPage(menu)) {
            return Pages.PMR;
        }

        if(PageResolver.isOnScSkedPage(menu)) {
            return Pages.SC_SKED;
        }

        if(PageResolver.isOnConfPage(menu)) {
            return Pages.CONF;
        }

        if(PageResolver.isOnFxdayPage(menu)) {
            return Pages.FXDAY;
        }

        if(PageResolver.isOnLayoverPage(menu)) {
            return Pages.LAYOVER;
        }

        if(PageResolver.isOnNqpsPage(menu)) {
            return Pages.NQPS;
        }

        if(PageResolver.isOnObwsPage(menu)) {
            return Pages.OBWS;
        }

        if(PageResolver.isOnPscrPage(menu)) {
            return Pages.PSCR;
        }

        if(PageResolver.isOnInversePage(menu)) {
            return Pages.INVERSE;
        }

        if(PageResolver.isOnMaxScPage(menu)) {
            return Pages.MAX_SC;
        }

        if(PageResolver.isOnSchsomePage(menu)) {
            return Pages.SCHSOME;
        }

        if(PageResolver.isOnDtcPage(menu)) {
            return Pages.DTC;
        }

        if(PageResolver.isOnDtcConfirmPage(menu)) {
            return Pages.DTC_CONFIRM;
        }

        if(PageResolver.isOnDtcDataPage(menu)) {
            return Pages.DTC_DATA;
        }

        return Pages.UNKNOWN;
    }

    static async getMatchingPages(menu) {
        let result = await Promise.all(this.ALL().map(async r => await r(menu)));
        result = this.ALL().filter((v, i) => result[i]).map(r => r.name.slice(4, -4).toUpperCase());

        if(result.length === 0) {
            return Pages.UNKNOWN;
        }

        return result;
    }
}