//v4
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
               && document.body.innerHTML.replace(/\r?\n|\r/g, " ").indexOf("Please close this window to complete the logoff process.") !== -1;
    }

    static isOnLockedOutPage(menu) {
        return menu === Menus.NONE
               && document.body.innerHTML.replace(/\r?\n|\r/g, " ").indexOf("Your iCrew account has been locked.") !== -1;
    }

    static isOnMainMenuPage(menu) {
        return menu === Menus.ALPA_MENU
               && $("#Frame").children().first().val() === "iCrew for ALPA";
    }

    static isOnSchsPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("CHANGE/DISPLAY PILOT SCHEDULE") !== -1
               && document.body.innerHTML.indexOf("(SCHC)") !== -1;
    }

    static isOnSchsDataPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("DTE OR DES OFF  STAT  ROT1 D R1 STAT  ROT2 D R2 RPT1 RPT2 E/L R CALL BLKN DTE") !== -1;
    }

    static isOnSchsHistoryPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("PILOT SCHEDULE HISTORY") !== -1;
    }

    static isOnSchsHistoryScrollMessagePage(menu) {
        return menu === Menus.ALPA_MENU
               && $(".tbl1").eq(0).text().indexOf("UNABLE TO USE SCROLL FUNCTION") !== -1
               && $(".tbl1").eq(0).text().indexOf("HIT ENTER TO VIEW SCHEDULE HISTORY") !== -1;
    }

    static isOnMustBeNOrLPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("MUST BE ' ', 'N' OR 'L'") !== -1;
    }

    static isOnRotationPage(menu) {
        return menu === Menus.ALPA_MENU
               && $(".txt4[type=password]").length === 1;
    }

    static isOnMotsPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("DISPLAY MONTHLY TIME DATA") !== -1;
    }

    static isOnMotsDataPage(menu) {
        return menu === Menus.ALPA_MENU
               && $("#Frame").children().first().val() === "Monthly Time Data";
    }

    static isOnMotvPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("DISPLAY USAGE AND BALANCES FOR VACATION/BANK/PAYBACK DAYS") !== -1
               && document.body.innerHTML.indexOf("TO IGNORE THIS SCREEN, PRESS 'PF1' FOR MAIN MENU OR 'PF2' FOR PREVIOUS MENU") !== -1;
    }

    static async isOnMotvDataPage(menu) {
        return menu === Menus.ALPA_MENU
               && (
                   (
                       document.body.innerHTML.indexOf("DISPLAY USAGE AND BALANCES FOR VACATION/BANK/PAYBACK DAYS") !== -1
                       && document.body.innerHTML.indexOf("NAME:") !== -1
                   ) || (
                       document.body.innerHTML.indexOf("END OF DISPLAY - PRESS ENTER TO RETURN TO PREVIOUS MENU") !== -1
                       //This is the previous page since it hasn't been updated yet
                       && await GMSettings.PAGE_CURRENT.get() === Pages.MOTV_DATA
                   )
               )
    }

    static isOnSickPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("Display Sick Time Usage And Balances") !== -1;
    }

    static isOnSickOccurrencesPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("UPDATE PILOT SICK OCCURRENCE DATA") !== -1;
    }

    static isOnPcsPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("OPEN TIME - PCS") !== -1;
    }

    static isOn23M7Page(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("DISPLAY 23M7 DATA") !== -1;
    }

    static isOn23M7DataPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("23M7 LOGS FOR BID PERIOD") !== -1;
    }

    static isOnPresPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnPcsPage(menu)
               && document.body.innerHTML.indexOf("DISPLAY PILOT RESERVE LEVELS") !== -1
               && document.body.innerHTML.indexOf("PRESM") !== -1;
    }

    static isOnRotsPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnPcsPage(menu)
               && document.body.innerHTML.indexOf("DISPLAY ROTATION OPEN TIME FILE") !== -1;
    }

    static isOnRotsHistoryPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("ROTATION OPEN TIME HISTORY") !== -1;
    }

    static isOnReserveOpenTimePage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnRotsPage(menu)
               && document.body.innerHTML.indexOf("RESERVE OPEN TIME") !== -1;
    }

    static isOnScAwdsPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("DISPLAY SC AWARDS/ASSIGNMENTS") !== -1;
    }

    static isOnVtssPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("DISPLAY V.T.S.") !== -1;
    }

    static isOnUddPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("CHANGE / DISPLAY DUE DATE INFORMATION") !== -1;
    }

    static isOnSlpPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnPcsPage(menu)
               && document.body.innerHTML.indexOf("PILOT SLIP REQUESTS") !== -1;
    }

    static isOnSwapPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnPcsPage(menu)
               && document.body.innerHTML.indexOf("SWAP WITH POT") !== -1;
    }

    static isOnLeavPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnPcsPage(menu)
               && document.body.innerHTML.indexOf("LEAVE REQUEST") !== -1
               && document.body.innerHTML.indexOf("(LEAV)") !== -1;
    }

    static isOnDtyPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("PRINT SUMMARY OF DUTY PERIODS OF ASSIGNMENTS") !== -1
               && document.body.innerHTML.indexOf("FOR A SPECIFIED BID PERIOD BEGIN DATE") !== -1;
    }

    static isOnRsRrPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("PRODUCE COUNT OF PILOTS WITH EXTENDED/SHORTENED ROTATIONS") !== -1
               && document.body.innerHTML.indexOf("(I.E. THOSE PILOTS WITH 'RR' AND 'RS' DATE FRAME ORIGIN CODES)") !== -1
               && document.body.innerHTML.indexOf("SPILLOVER ROTATIONS ARE COUNTED IN BID PERIOD ASSOCIATED WITH ROTATION DATE") !== -1;
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
               && document.body.innerHTML.indexOf("To see report online, type SCRE else press") !== -1;
    }

    static isOnLayIoePage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("REPORT OF ALL IOE DUTY PERIODS THAT LAYOVER IN DOMICILE") !== -1;
    }

    static isOnPmrPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("PRINT PILOT MONTHLY RESERVE REPORT") !== -1;
    }

    static isOnScSkedPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("PILOT SHORT CALL COUNTS BY CATEGORY AND BID PERIOD") !== -1;
    }

    static isOnConfPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("PRINT REGULAR LINE PILOTS") !== -1
               && document.body.innerHTML.indexOf("WITH A GREEN SLIP/INVERSE ASSIGNMENT CONFLICT") !== -1
               && document.body.innerHTML.indexOf("FOR A SPECIFIED BID PERIOD BEGIN DATE") !== -1;
    }

    static isOnFxdayPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("REPORT FLOATING XDAY DUE") !== -1;
    }

    static isOnLayoverPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("REPORT OF ALL DUTY PERIODS THAT LAYOVER IN DOMICILE") !== -1;
    }

    static isOnNqpsPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("NON-QUALIFIED PILOTS") !== -1
               && document.body.innerHTML.indexOf("(NQPS)") !== -1;
    }

    static isOnObwsPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("OUT OF BASE WHITE SLIP REPORT") !== -1
               && document.body.innerHTML.indexOf("(OBWS)") !== -1;
    }

    static isOnPscrPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("PRODUCE REPORT OF PILOTS WITH SPECIFIED SCHEDULE CODES") !== -1
               && document.body.innerHTML.indexOf("TO PRODUCE REPORT OF PILOTS WITH SPECIFIED SCHEDULES CODES, ENTER:") !== -1;
    }

    static isOnInversePage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("PRINT REGULAR OR RESERVE LINE PILOTS WITH AN INVERSE ASSIGNMENT") !== -1
               && document.body.innerHTML.indexOf("FOR A SPECIFIED BID PERIOD BEGIN DATE") !== -1;
    }

    static isOnMaxScPage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("COUNT OF ALL SHORT CALLS THAT EXCEED MAXIMUM ALLOWED") !== -1;
    }

    static isOnSchsomePage(menu) {
        return menu === Menus.ALPA_MENU
               && document.body.innerHTML.indexOf("SCHEDULES FOR REQUESTED PILOTS") !== -1;
    }

    static isOnDtcPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnDtcConfirmPage(menu)
               && !PageResolver.isOnPcsPage(menu)
               && document.body.innerHTML.indexOf("DAILY TRIP COVERAGE") !== -1;
    }

    static isOnDtcDataPage(menu) {
        return menu === Menus.ALPA_MENU
               && !PageResolver.isOnDtcConfirmPage(menu)
               && document.body.innerHTML.indexOf("Daily Trip Coverage") !== -1;
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