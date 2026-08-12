//v4
class OldGMSettings {
    static SettingMigration = class {
        constructor(oldValue, newValue, versionChanged) {
            this.oldValue = oldValue;
            this.newValue = newValue;
            this.versionChanged = versionChanged;
        }
    }

    static get PRE_1_0_PAGE_VALUE_SCHS_DATA_BID_PERIOD() { return new this.SettingMigration("schsDataBidPeriod", "schsDataBidPeriodValue", "1.0"); }
    static get PRE_1_0_PANE_SCHS_TOGGLED() { return new this.SettingMigration("schsToggled", "", "1.0"); }
    static get PRE_1_0_STICKY_SCHS_ACTION() { return new this.SettingMigration("stickySchsAction", "", "1.0"); }
    static get PRE_1_0_PREVIOUS_PAGE() { return new this.SettingMigration("previousPage", "", "1.0"); }
    static get PRE_1_0_PRINT_SCHEDULE_NEXT_PAGE() { return new this.SettingMigration("printScheduleNextPage", "", "1.0"); }
    static get PRE_1_0_PRINT_SCHEDULE_TEXT() { return new this.SettingMigration("printScheduleText", "", "1.0"); }
    static get PRE_1_0_PRINT_SCHEDULE_TIMECARD_NEXT_PAGE() { return new this.SettingMigration("printScheduleTimecardNextPage", "", "1.0"); }
    static get PRE_1_0_PRINT_SCHEDULE_TIMECARD_TEXT() { return new this.SettingMigration("printScheduleTimecardText", "", "1.0"); }
    static get PRE_1_0_PRINT_TIMECARD_NEXT_PAGE() { return new this.SettingMigration("printTimecardNextPage", "", "1.0"); }
    static get PRE_1_0_PRINT_TIMECARD_TEXT() { return new this.SettingMigration("printTimecardText", "", "1.0"); }
    static get PRE_1_0_DTC_SEARCH_START() { return new this.SettingMigration("dtcSearchStart", "", "1.0"); }
    static get PRE_1_0_DTC_SEARCH_END() { return new this.SettingMigration("dtcSearchEnd", "", "1.0"); }
    static get PRE_1_0_DTC_SEARCH_NEXT_PAGE() { return new this.SettingMigration("dtcSearchNextPage", "", "1.0"); }
    static get PRE_1_0_LOGIN_ATTEMPT() { return new this.SettingMigration("loginAttempt", "", "1.0"); }

    static get PRE_1_0_1_PANE_SETTINGS_TOGGLED() { return new this.SettingMigration("settingsToggled", "paneSettingsToggled", "1.0.1"); }
    static get PRE_1_0_1_PANE_LIST_ENTRY_TOGGLED() { return new this.SettingMigration("listEntryToggled", "paneListEntryToggled", "1.0.1"); }
    static get PRE_1_0_1_PANE_COMPILE_TOGGLED() { return new this.SettingMigration("printToggled", "paneCompileToggled", "1.0.1"); }
    static get PRE_1_0_1_PANE_GOTO_TOGGLED() { return new this.SettingMigration("gotoToggled", "paneGotoToggled", "1.0.1"); }
    static get PRE_1_0_1_PANE_NEW_TAB_TOGGLED() { return new this.SettingMigration("newTabToggled", "paneNewTabToggled", "1.0.1"); }
    static get PRE_1_0_1_PANE_DATE_SEARCH_TOGGLED() { return new this.SettingMigration("dateSearchToggled", "paneDateSearchToggled", "1.0.1"); }
    static get PRE_1_0_1_PANE_EMPLOYEE_SEARCH_TOGGLED() { return new this.SettingMigration("employeeSearchToggled", "paneEmployeeSearchToggled", "1.0.1"); }
    static get PRE_1_0_1_AUTO_LOGIN_ENABLE() { return new this.SettingMigration("autoLogin", "autoLoginEnable", "1.0.1"); }
    static get PRE_1_0_1_AUTO_LOGIN_USERNAME() { return new this.SettingMigration("username", "autoLoginUsername", "1.0.1"); }
    static get PRE_1_0_1_AUTO_LOGIN_PASSWORD() { return new this.SettingMigration("password", "autoLoginPassword", "1.0.1"); }
    static get PRE_1_0_1_REDIRECT_TO_ALPA_MENU_ENABLE() { return new this.SettingMigration("redirectAlpaMenu", "redirectToAlpaMenuEnable", "1.0.1"); }
    static get PRE_1_0_1_SKIP_PILOT_MENU_ADVISORIES_ENABLE() { return new this.SettingMigration("skipPilotMenuAdvisories", "skipPilotMenuAdvisoriesEnable", "1.0.1"); }
    static get PRE_1_0_1_SKIP_TIMEOUT_ENABLE() { return new this.SettingMigration("skipTimeout", "skipTimeoutEnable", "1.0.1"); }
    static get PRE_1_0_1_PAGE_BACK_ENABLE() { return new this.SettingMigration("back", "pageBackEnable", "1.0.1"); }
    static get PRE_1_0_1_SKIP_CONFIRM_ENABLE() { return new this.SettingMigration("skipConfirm", "skipConfirmEnable", "1.0.1"); }
    static get PRE_1_0_1_STARTING_PAGE_VALUE() { return new this.SettingMigration("startingPage", "startingPageValue", "1.0.1"); }
    static get PRE_1_0_1_SCHS_BID_PERIOD_STICKY_ENABLE() { return new this.SettingMigration("schsBidPeriod", "schsBidPeriodStickyEnable", "1.0.1"); }
    static get PRE_1_0_1_SCHS_BID_PERIOD_STICKY_VALUE() { return new this.SettingMigration("schsBidPeriodValue", "schsBidPeriodStickyValue", "1.0.1"); }
    static get PRE_1_0_1_SCHS_ACTION_INSERT_VALUE() { return new this.SettingMigration("schsActionValue", "schsActionInsertValue", "1.0.1"); }
    static get PRE_1_0_1_MOTS_BID_PERIOD_STICKY_ENABLE() { return new this.SettingMigration("motsBidPeriod", "motsBidPeriodStickyEnable", "1.0.1"); }
    static get PRE_1_0_1_MOTS_BID_PERIOD_STICKY_VALUE() { return new this.SettingMigration("motsBidPeriodValue", "motsBidPeriodStickyValue", "1.0.1"); }
    static get PRE_1_0_1_MOTS_INSERT_A_ENABLE() { return new this.SettingMigration("motsA", "motsInsertAEnable", "1.0.1"); }
    static get PRE_1_0_1_ROTS_INSERT_Y_ENABLE() { return new this.SettingMigration("rotsY", "rotsInsertYEnable", "1.0.1"); }
    static get PRE_1_0_1_RESERVE_OPEN_TIME_INSERT_D_ENABLE() { return new this.SettingMigration("reserveOpenTimeD", "reserveOpenTimeInsertDEnable", "1.0.1"); }
    static get PRE_1_0_1_VTSS_INSERT_X_ENABLE() { return new this.SettingMigration("vtssX", "vtssInsertXEnable", "1.0.1"); }
    static get PRE_1_0_1_UDD_ACTION_STICKY_ENABLE() { return new this.SettingMigration("uddAction", "uddActionStickyEnable", "1.0.1"); }
    static get PRE_1_0_1_UDD_ACTION_STICKY_VALUE() { return new this.SettingMigration("uddActionValue", "uddActionStickyValue", "1.0.1"); }
    static get PRE_1_0_1_DTC_BASE_STICKY_ENABLE() { return new this.SettingMigration("dtcBase", "dtcBaseStickyEnable", "1.0.1"); }
    static get PRE_1_0_1_DTC_BASE_STICKY_VALUE() { return new this.SettingMigration("dtcBaseValue", "dtcBaseStickyValue", "1.0.1"); }
    static get PRE_1_0_1_DTC_EQUIPMENT_STICKY_ENABLE() { return new this.SettingMigration("dtcEquipment", "dtcEquipmentStickyEnable", "1.0.1"); }
    static get PRE_1_0_1_DTC_EQUIPMENT_STICKY_VALUE() { return new this.SettingMigration("dtcEquipmentValue", "dtcEquipmentStickyValue", "1.0.1"); }
    static get PRE_1_0_1_DTC_POSITION_STICKY_ENABLE() { return new this.SettingMigration("dtcPosition", "dtcPositionStickyEnable", "1.0.1"); }
    static get PRE_1_0_1_DTC_POSITION_STICKY_VALUE() { return new this.SettingMigration("dtcPositionValue", "dtcPositionStickyValue", "1.0.1"); }
    static get PRE_1_0_1_DTC_BEGIN_DATE_STICKY_ENABLE() { return new this.SettingMigration("dtcBeginDate", "dtcBeginDateStickyEnable", "1.0.1"); }
    static get PRE_1_0_1_DTC_BEGIN_DATE_STICKY_VALUE() { return new this.SettingMigration("dtcBeginDateValue", "dtcBeginDateStickyValue", "1.0.1"); }
    static get PRE_1_0_1_DTC_INSERT_SCRE_ENABLE() { return new this.SettingMigration("dtcScre", "dtcInsertScreEnable", "1.0.1"); }
    static get PRE_1_0_1_TEST_PAGE_RESOLVERS_PAGE() { return new this.SettingMigration("testResolversPage", "testPageResolversPage", "1.0.1"); }
    static get PRE_1_0_1_TEST_PAGE_RESOLVERS_RESULT() { return new this.SettingMigration("testResolversResult", "testPageResolversResult", "1.0.1"); }
    static get PRE_1_0_1_PAGE_CURRENT() { return new this.SettingMigration("page", "pageCurrent", "1.0.1"); }
    static get PRE_1_0_1_PAGE_LAST_CONTENT_PREVIOUS() { return new this.SettingMigration("pagePreviousLastContent", "pageLastContentPrevious", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_SCHS_DATA_ACTION() { return new this.SettingMigration("compiledScheduleAction", "compiledSchsDataAction", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_SCHS_DATA_NEXT_PAGE() { return new this.SettingMigration("compiledScheduleNextPage", "compiledSchsDataNextPage", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_SCHS_DATA_VALUE() { return new this.SettingMigration("compiledScheduleText", "compiledSchsDataValue", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_SCHS_DATA_AND_MOTS_ACTION() { return new this.SettingMigration("compiledScheduleTimecardAction", "compiledSchsDataAndMotsAction", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_SCHS_DATA_AND_MOTS_NEXT_PAGE() { return new this.SettingMigration("compiledScheduleTimecardNextPage", "compiledSchsDataAndMotsNextPage", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_SCHS_DATA_AND_MOTS_VALUE() { return new this.SettingMigration("compiledScheduleTimecardText", "compiledSchsDataAndMotsValue", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_SCHS_DATA_AND_MOTV_ACTION() { return new this.SettingMigration("compiledScheduleVacationAction", "compiledSchsDataAndMotvAction", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_SCHS_DATA_AND_MOTV_NEXT_PAGE() { return new this.SettingMigration("compiledScheduleVacationNextPage", "compiledSchsDataAndMotvNextPage", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_SCHS_DATA_AND_MOTV_VALUE() { return new this.SettingMigration("compiledScheduleVacationText", "compiledSchsDataAndMotvValue", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_SCHS_HISTORY_VALUE() { return new this.SettingMigration("compiledSchsHistoryText", "compiledSchsHistoryValue", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_ROTATION_VALUE() { return new this.SettingMigration("compiledRotationText", "compiledRotationValue", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_MOTS_ACTION() { return new this.SettingMigration("compiledTimecardAction", "compiledMotsAction", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_MOTS_NEXT_PAGE() { return new this.SettingMigration("compiledTimecardNextPage", "compiledMotsNextPage", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_MOTS_VALUE() { return new this.SettingMigration("compiledTimecardText", "compiledMotsValue", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_MOTV_ACTION() { return new this.SettingMigration("compiledVacationAction", "compiledMotvAction", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_MOTV_NEXT_PAGE() { return new this.SettingMigration("compiledVacationNextPage", "compiledMotvNextPage", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_MOTV_VALUE() { return new this.SettingMigration("compiledVacationText", "compiledMotvValue", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_ROTS_HISTORY_VALUE() { return new this.SettingMigration("compiledRotsHistoryText", "compiledRotsHistoryValue", "1.0.1"); }
    static get PRE_1_0_1_COMPILED_23M7_VALUE() { return new this.SettingMigration("compiled23m7Text", "compiled23m7Value", "1.0.1"); }
    static get PRE_1_0_1_PAGE_VALUE_SCHS_DATA_NAME() { return new this.SettingMigration("schsDataNameValue", "pageValueSchsDataName", "1.0.1"); }
    static get PRE_1_0_1_PAGE_VALUE_SCHS_DATA_BASE() { return new this.SettingMigration("schsDataBaseValue", "pageValueSchsDataBase", "1.0.1"); }
    static get PRE_1_0_1_PAGE_VALUE_SCHS_DATA_EQUIPMENT() { return new this.SettingMigration("schsDataEquipmentValue", "pageValueSchsDataEquipment", "1.0.1"); }
    static get PRE_1_0_1_PAGE_VALUE_SCHS_DATA_POSITION() { return new this.SettingMigration("schsDataPositionValue", "pageValueSchsDataPosition", "1.0.1"); }
    static get PRE_1_0_1_PAGE_VALUE_SCHS_DATA_EMPLOYEE_NUMBER() { return new this.SettingMigration("schsDataEmployeeNumberValue", "pageValueSchsDataEmployeeNumber", "1.0.1"); }
    static get PRE_1_0_1_PAGE_VALUE_SCHS_DATA_BID_PERIOD() { return new this.SettingMigration("schsDataBidPeriodValue", "pageValueSchsDataBidPeriod", "1.0.1"); }
    static get PRE_1_0_1_PAGE_VALUE_SCHS_DATA_ROTATION_DATE() { return new this.SettingMigration("schsDataRotationDate", "pageValueSchsDataRotationDate", "1.0.1"); }
    static get PRE_1_0_1_PAGE_VALUE_ROTATION_NUMBER() { return new this.SettingMigration("rotationNumberValue", "pageValueRotationNumber", "1.0.1"); }
    static get PRE_1_0_1_PAGE_VALUE_ROTATION_DUPE_NUMBER() { return new this.SettingMigration("rotationDupeNumberValue", "pageValueRotationDupeNumber", "1.0.1"); }
    static get PRE_1_0_1_PAGE_VALUE_ROTATION_POSITION() { return new this.SettingMigration("rotationPositionValue", "pageValueRotationPosition", "1.0.1"); }
    static get PRE_1_0_1_PAGE_VALUE_MOTS_EMPLOYEE_NUMBER() { return new this.SettingMigration("motsEmployeeNumberValue", "pageValueMotsEmployeeNumber", "1.0.1"); }
    static get PRE_1_0_1_PAGE_VALUE_SC_AWDS_CATEGORY() { return new this.SettingMigration("scAwdsCategory", "pageValueScAwdsCategory", "1.0.1"); }
    static get PRE_1_0_1_EMPLOYEE_SEARCH_USE_EMPLOYEE_NUMBER() { return new this.SettingMigration("employeeSearchUseNumber", "employeeSearchUseEmployeeNumber", "1.0.1"); }
    static get PRE_1_0_1_EMPLOYEE_SEARCH_EMPLOYEE_NUMBER() { return new this.SettingMigration("employeeSearchNumber", "employeeSearchEmployeeNumber", "1.0.1"); }
    static get PRE_1_0_1_EMPLOYEE_SEARCH_USE_ROTATION_NUMBER() { return new this.SettingMigration("employeeSearchUseRotation", "employeeSearchUseRotationNumber", "1.0.1"); }
    static get PRE_1_0_1_EMPLOYEE_SEARCH_ROTATION_NUMBER() { return new this.SettingMigration("employeeSearchRotation", "employeeSearchRotationNumber", "1.0.1"); }
    static get PRE_1_0_1_NEW_TAB_PAGE() { return new this.SettingMigration("newTapPage", "newTabPage", "1.0.1"); }

    static get PRE_1_0_2_NEW_TAB_PAGE() { return new this.SettingMigration("newTabPage", "newTabToPage", "1.0.2"); }
    static get PRE_1_0_2_POPULATE_ROTS_FROM_ROTATION() { return new this.SettingMigration("populateRotsFromRotation", "", "1.0.2"); }
    static get PRE_1_0_2_POPULATE_RPH_FROM_ROTATION() { return new this.SettingMigration("populateRphFromRotation", "", "1.0.2"); }
    static get PRE_1_0_2_POPULATE_MPI_FROM_ROTATION() { return new this.SettingMigration("populateMpiFromRotation", "", "1.0.2"); }

    static get PRE_1_8_COMPILED_SCHS_DATA_NEXT_PAGE() { return new this.SettingMigration("compiledSchsDataNextPage", "compiledSchsDataRunning", "1.8"); }
    static get PRE_1_8_COMPILED_SCHS_DATA_AND_MOTS_NEXT_PAGE() { return new this.SettingMigration("compiledSchsDataAndMotsNextPage", "compiledSchsDataAndMotsRunning", "1.8"); }
    static get PRE_1_8_COMPILED_SCHS_DATA_AND_MOTV_NEXT_PAGE() { return new this.SettingMigration("compiledSchsDataAndMotvNextPage", "compiledSchsDataAndMotvRunning", "1.8"); }
    static get PRE_1_8_COMPILED_SCHS_DATA_AND_SICK_NEXT_PAGE() { return new this.SettingMigration("compiledSchsDataAndSickNextPage", "compiledSchsDataAndSickRunning", "1.8"); }
    static get PRE_1_8_COMPILED_SCHS_HISTORY_NEXT_PAGE() { return new this.SettingMigration("compiledSchsHistoryNextPage", "compiledSchsHistoryRunning", "1.8"); }
    static get PRE_1_8_COMPILED_ROTATION_NEXT_PAGE() { return new this.SettingMigration("compiledRotationNextPage", "compiledRotationRunning", "1.8"); }
    static get PRE_1_8_COMPILED_MOTS_NEXT_PAGE() { return new this.SettingMigration("compiledMotsNextPage", "compiledMotsRunning", "1.8"); }
    static get PRE_1_8_COMPILED_MOTV_NEXT_PAGE() { return new this.SettingMigration("compiledMotvNextPage", "compiledMotvRunning", "1.8"); }
    static get PRE_1_8_COMPILED_SICK_NEXT_PAGE() { return new this.SettingMigration("compiledSickNextPage", "compiledSickRunning", "1.8"); }
    static get PRE_1_8_COMPILED_ROTS_HISTORY_NEXT_PAGE() { return new this.SettingMigration("compiledRotsHistoryNextPage", "compiledRotsHistoryRunning", "1.8"); }
    static get PRE_1_8_COMPILED_23M7_NEXT_PAGE() { return new this.SettingMigration("compiled23m7NextPage", "compiled23m7Running", "1.8"); }
    static get PRE_1_8_DATE_SEARCH_NEXT_PAGE() { return new this.SettingMigration("dateSearchNextPage", "dateSearchRunning", "1.8"); }
    static get PRE_1_8_EMPLOYEE_SEARCH_NEXT_PAGE() { return new this.SettingMigration("employeeSearchNextPage", "employeeSearchRunning", "1.8"); }

    static get PRE_1_9_STARTING_PAGE_ATTEMPT() { return new this.SettingMigration("startingPageAttempt", "", "1.9"); }
    static get PRE_1_9_NEW_TAB_TO_PAGE() { return new this.SettingMigration("newTabToPage", "", "1.9"); }
    static get PRE_1_9_NEW_TAB_TARGET_PAGE() { return new this.SettingMigration("newTabTargetPage", "", "1.9"); }
    static get PRE_1_9_NEW_TAB_FROM_PAGE() { return new this.SettingMigration("newTabFromPage", "", "1.9"); }
    static get PRE_1_9_GO_FROM_MUST_BE_N_OR_L_TO() { return new this.SettingMigration("goFromMustBeNOrLTo", "", "1.9"); }
    static get PRE_1_9_GO_FROM_SCHS_DATA_TO() { return new this.SettingMigration("goFromSchsDataTo", "", "1.9"); }

    static get PRE_3_0_DATE_SEARCH_START() { return new this.SettingMigration("dateSearchStart", "", "3.0"); }
    static get PRE_3_0_DATE_SEARCH_END() { return new this.SettingMigration("dateSearchEnd", "", "3.0"); }
    static get PRE_3_0_PANE_EMPLOYEE_SEARCH_TOGGLED() { return new this.SettingMigration("paneEmployeeSearchToggled", "pane23m7SearchToggled", "3.0"); }
    static get PRE_3_0_EMPLOYEE_SEARCH_USE_EMPLOYEE_NUMBER() { return new this.SettingMigration("employeeSearchUseEmployeeNumber", "", "3.0"); }
    static get PRE_3_0_EMPLOYEE_SEARCH_EMPLOYEE_NUMBER() { return new this.SettingMigration("employeeSearchEmployeeNumber", "23m7SearchEmployeeNumber", "3.0"); }
    static get PRE_3_0_EMPLOYEE_SEARCH_USE_DATE() { return new this.SettingMigration("employeeSearchUseDate", "", "3.0"); }
    static get PRE_3_0_EMPLOYEE_SEARCH_START() { return new this.SettingMigration("employeeSearchStart", "23m7SearchStart", "3.0"); }
    static get PRE_3_0_EMPLOYEE_SEARCH_END() { return new this.SettingMigration("employeeSearchEnd", "23m7SearchEnd", "3.0"); }
    static get PRE_3_0_EMPLOYEE_SEARCH_USE_ROTATION_NUMBER() { return new this.SettingMigration("employeeSearchUseRotationNumber", "", "3.0"); }
    static get PRE_3_0_EMPLOYEE_SEARCH_ROTATION_NUMBER() { return new this.SettingMigration("employeeSearchRotationNumber", "23m7SearchRotationNumber", "3.0"); }
    static get PRE_3_0_EMPLOYEE_SEARCH_RUNNING() { return new this.SettingMigration("employeeSearchRunning", "23m7SearchRunning", "3.0"); }
    static get PRE_3_0_SCHS_BID_PERIOD_STICKY_VALUE() { return new this.SettingMigration("schsBidPeriodStickyValue", "", "3.0"); }
    static get PRE_3_0_MOTS_BID_PERIOD_STICKY_VALUE() { return new this.SettingMigration("motsBidPeriodStickyValue", "", "3.0"); }
    static get PRE_3_0_SCHS_ACTION_INSERT_VALUE() { return new this.SettingMigration("schsActionInsertValue", "schsActionDefaultValue", "3.0"); }
    static get PRE_3_0_TEST_PAGE_RESOLVERS_PAGE() { return new this.SettingMigration("testPageResolversPage", "", "3.0"); }
    static get PRE_3_0_SAVE_ALL_SCHS_DATA_CURRENT_FILE_SAVED() { return new this.SettingMigration("saveAllSchsDataCurrentFileSaved", "", "3.0"); }
    static get PRE_3_0_PAGE_VALUE_MOTV_EMPLOYEE_NUMBER() { return new this.SettingMigration("pageValueMotvEmployeeNumber", "pageValueMotvDataEmployeeNumber", "3.0"); }
    static get PRE_3_0_PAGE_VALUE_MOTV_BEGIN_BID_PERIOD() { return new this.SettingMigration("pageValueMotvBeginBidPeriod", "pageValueMotvDataBeginBidPeriod", "3.0"); }
    static get PRE_3_0_PAGE_VALUE_MOTV_CURRENT_BID_PERIOD() { return new this.SettingMigration("pageValueMotvCurrentBidPeriod", "pageValueMotvDataCurrentBidPeriod", "3.0"); }

    static ALL_MIGRATIONS() { return Object.entries(Object.getOwnPropertyDescriptors(OldGMSettings))
                                         .filter(([key, descriptor]) => typeof descriptor.get === "function")
                                         .map(([key]) => OldGMSettings[key])
                                         .sort((a, b) => new Intl.Collator(undefined, { numeric: true }).compare(a.versionChanged, b.versionChanged)); }

    static async mockMigrate() {
        let migrations = OldGMSettings.ALL_MIGRATIONS();
        let results = [];

        for(let i = 0; i < migrations.length; i++) {
            let oldValue = await GM.getValue(migrations[i].oldValue, undefined);

            let result = {};
            result.versionChanged = migrations[i].versionChanged;
            result.oldKey = migrations[i].oldValue;
            result.oldValue = oldValue;
            result.newKey = migrations[i].newValue;
            result.deletingOldValue = oldValue !== undefined;
            result.replacingNewValue = migrations[i].newValue != false;

            results.push(result);
        }

        return results;
    }

    static async migrate() {
        console.log("Better: Running old settings migration");

        let migrations = OldGMSettings.ALL_MIGRATIONS();

        for(let i = 0; i < migrations.length; i++) {
            let oldValue = await GM.getValue(migrations[i].oldValue, undefined);

            if(oldValue !== undefined) {
                if(migrations[i].newValue != false) {
                    await GM.setValue(migrations[i].newValue, oldValue);
                }

                await GM.deleteValue(migrations[i].oldValue);
            }
        }

        console.log("Better: Done");
    }
}