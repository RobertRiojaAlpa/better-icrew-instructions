//v16
class GMSettings {
    static GMSetting = class {
        constructor(name, defaultValue) {
            this.name = name;
            this.defaultValue = defaultValue;
        }

        async get() {
            return await GM.getValue(this.name, this.defaultValue);
        }

        async set(value) {
            return await GM.setValue(this.name, value);
        }

        delete() {
            GM.deleteValue(this.name);
        }
    }

    //Pane settings
    static get PANE_SETTINGS_TOGGLED() { return new this.GMSetting("paneSettingsToggled", true); }
    static get PANE_SETTINGS_DEBUG_TOGGLED() { return new this.GMSetting("paneSettingsDebugToggled", false); }
    static get PANE_LIST_ENTRY_TOGGLED() { return new this.GMSetting("paneListEntryToggled", true); }
    static get PANE_COMPILE_TOGGLED() { return new this.GMSetting("paneCompileToggled", true); }
    static get PANE_COMPILE_MANY_TOGGLED() { return new this.GMSetting("paneCompileManyToggled", true); }
    static get PANE_GOTO_TOGGLED() { return new this.GMSetting("paneGotoToggled", true); }
    static get PANE_NEW_TAB_TOGGLED() { return new this.GMSetting("paneNewTabToggled", true); }
    static get PANE_DATE_SEARCH_TOGGLED() { return new this.GMSetting("paneDateSearchToggled", true); }
    static get PANE_23M7_SEARCH_TOGGLED() { return new this.GMSetting("pane23m7SearchToggled", true); }

    //Main settings
    static get AUTO_LOGIN_ENABLE() { return new this.GMSetting("autoLoginEnable", false); }
    static get AUTO_LOGIN_USERNAME() { return new this.GMSetting("autoLoginUsername", ""); }
    static get AUTO_LOGIN_PASSWORD() { return new this.GMSetting("autoLoginPassword", ""); }

    static get REDIRECT_TO_ALPA_MENU_ENABLE() { return new this.GMSetting("redirectToAlpaMenuEnable", false); }
    static get SKIP_PILOT_MENU_ADVISORIES_ENABLE() { return new this.GMSetting("skipPilotMenuAdvisoriesEnable", false); }
    static get SKIP_TIMEOUT_ENABLE() { return new this.GMSetting("skipTimeoutEnable", false); }
    static get PAGE_BACK_ENABLE() { return new this.GMSetting("pageBackEnable", false); }
    static get SKIP_CONFIRM_ENABLE() { return new this.GMSetting("skipConfirmEnable", false); }

    static get STARTING_PAGE_VALUE() { return new this.GMSetting("startingPageValue", ""); }

    static get SCHS_BID_PERIOD_STICKY_ENABLE() { return new this.GMSetting("schsBidPeriodStickyEnable", false); }
    static get SCHS_ACTION_TYPE() { return new this.GMSetting("schsActionType", ""); }
    static get SCHS_ACTION_DEFAULT_VALUE() { return new this.GMSetting("schsActionDefaultValue", ""); }

    static get MOTS_BID_PERIOD_STICKY_ENABLE() { return new this.GMSetting("motsBidPeriodStickyEnable", false); }
    static get MOTS_INSERT_A_ENABLE() { return new this.GMSetting("motsInsertAEnable", false); }

    static get MOTV_BID_PERIOD_STICKY_ENABLE() { return new this.GMSetting("motvBidPeriodStickyEnable", false); }

    static get ROTS_INSERT_Y_ENABLE() { return new this.GMSetting("rotsInsertYEnable", false); }

    static get RESERVE_OPEN_TIME_INSERT_D_ENABLE() { return new this.GMSetting("reserveOpenTimeInsertDEnable", false); }

    static get VTSS_INSERT_X_ENABLE() { return new this.GMSetting("vtssInsertXEnable", false); }

    static get UDD_ACTION_STICKY_ENABLE() { return new this.GMSetting("uddActionStickyEnable", false); }
    static get UDD_ACTION_STICKY_VALUE() { return new this.GMSetting("uddActionStickyValue", ""); }

    static get DTC_BASE_STICKY_ENABLE() { return new this.GMSetting("dtcBaseStickyEnable", false); }
    static get DTC_BASE_STICKY_VALUE() { return new this.GMSetting("dtcBaseStickyValue", ""); }
    static get DTC_EQUIPMENT_STICKY_ENABLE() { return new this.GMSetting("dtcEquipmentStickyEnable", false); }
    static get DTC_EQUIPMENT_STICKY_VALUE() { return new this.GMSetting("dtcEquipmentStickyValue", ""); }
    static get DTC_POSITION_STICKY_ENABLE() { return new this.GMSetting("dtcPositionStickyEnable", false); }
    static get DTC_POSITION_STICKY_VALUE() { return new this.GMSetting("dtcPositionStickyValue", ""); }
    static get DTC_BEGIN_DATE_STICKY_ENABLE() { return new this.GMSetting("dtcBeginDateStickyEnable", false); }
    static get DTC_BEGIN_DATE_STICKY_VALUE() { return new this.GMSetting("dtcBeginDateStickyValue", ""); }
    static get DTC_INSERT_SCRE_ENABLE() { return new this.GMSetting("dtcInsertScreEnable", false); }

    static get TEST_PAGE_RESOLVERS_RESULT() { return new this.GMSetting("testPageResolversResult", ""); }

    //Page resolver settings
    static get PAGE_CURRENT() { return new this.GMSetting("pageCurrent", Pages.UNKNOWN); }
    static get PAGE_PREVIOUS() { return new this.GMSetting("pagePrevious", Pages.UNKNOWN); }
    static get PAGE_LAST_DIFFERENT() { return new this.GMSetting("pageLastDifferent", Pages.UNKNOWN); }
    static get PAGE_LAST_CONTENT() { return new this.GMSetting("pageLastContent", Pages.UNKNOWN); }
    static get PAGE_LAST_CONTENT_PREVIOUS() { return new this.GMSetting("pageLastContentPrevious", Pages.UNKNOWN); }

    //Compile settings
    static get COMPILED_SCHS_DATA_ACTION() { return new this.GMSetting("compiledSchsDataAction", ""); }
    static get COMPILED_SCHS_DATA_RUNNING() { return new this.GMSetting("compiledSchsDataRunning", false); }
    static get COMPILED_SCHS_DATA_VALUE() { return new this.GMSetting("compiledSchsDataValue", []); }

    static get COMPILED_SCHS_DATA_AND_MOTS_ACTION() { return new this.GMSetting("compiledSchsDataAndMotsAction", ""); }
    static get COMPILED_SCHS_DATA_AND_MOTS_RUNNING() { return new this.GMSetting("compiledSchsDataAndMotsRunning", false); }
    static get COMPILED_SCHS_DATA_AND_MOTS_VALUE() { return new this.GMSetting("compiledSchsDataAndMotsValue", []); }

    static get COMPILED_SCHS_DATA_AND_MOTV_ACTION() { return new this.GMSetting("compiledSchsDataAndMotvAction", ""); }
    static get COMPILED_SCHS_DATA_AND_MOTV_RUNNING() { return new this.GMSetting("compiledSchsDataAndMotvRunning", false); }
    static get COMPILED_SCHS_DATA_AND_MOTV_VALUE() { return new this.GMSetting("compiledSchsDataAndMotvValue", []); }

    static get COMPILED_SCHS_DATA_AND_SICK_ACTION() { return new this.GMSetting("compiledSchsDataAndSickAction", ""); }
    static get COMPILED_SCHS_DATA_AND_SICK_RUNNING() { return new this.GMSetting("compiledSchsDataAndSickRunning", false); }
    static get COMPILED_SCHS_DATA_AND_SICK_VALUE() { return new this.GMSetting("compiledSchsDataAndSickValue", []); }

    static get COMPILED_SCHS_HISTORY_ACTION() { return new this.GMSetting("compiledSchsHistoryAction", ""); }
    static get COMPILED_SCHS_HISTORY_RUNNING() { return new this.GMSetting("compiledSchsHistoryRunning", false); }
    static get COMPILED_SCHS_HISTORY_VALUE() { return new this.GMSetting("compiledSchsHistoryValue", []); }

    static get COMPILED_ROTATION_ACTION() { return new this.GMSetting("compiledRotationAction", ""); }
    static get COMPILED_ROTATION_RUNNING() { return new this.GMSetting("compiledRotationRunning", false); }
    static get COMPILED_ROTATION_VALUE() { return new this.GMSetting("compiledRotationValue", []); }

    static get COMPILED_MOTS_ACTION() { return new this.GMSetting("compiledMotsAction", ""); }
    static get COMPILED_MOTS_RUNNING() { return new this.GMSetting("compiledMotsRunning", false); }
    static get COMPILED_MOTS_VALUE() { return new this.GMSetting("compiledMotsValue", []); }

    static get COMPILED_MOTV_ACTION() { return new this.GMSetting("compiledMotvAction", ""); }
    static get COMPILED_MOTV_RUNNING() { return new this.GMSetting("compiledMotvRunning", false); }
    static get COMPILED_MOTV_VALUE() { return new this.GMSetting("compiledMotvValue", []); }

    static get COMPILED_SICK_ACTION() { return new this.GMSetting("compiledSickAction", ""); }
    static get COMPILED_SICK_RUNNING() { return new this.GMSetting("compiledSickRunning", false); }
    static get COMPILED_SICK_VALUE() { return new this.GMSetting("compiledSickValue", []); }

    static get COMPILED_ROTS_HISTORY_ACTION() { return new this.GMSetting("compiledRotsHistoryAction", ""); }
    static get COMPILED_ROTS_HISTORY_RUNNING() { return new this.GMSetting("compiledRotsHistoryRunning", false); }
    static get COMPILED_ROTS_HISTORY_VALUE() { return new this.GMSetting("compiledRotsHistoryValue", []); }

    static get COMPILED_23M7_ACTION() { return new this.GMSetting("compiled23m7Action", ""); }
    static get COMPILED_23M7_RUNNING() { return new this.GMSetting("compiled23m7Running", false); }
    static get COMPILED_23M7_VALUE() { return new this.GMSetting("compiled23m7Value", []); }

    static get COMPILED_MANY_SCHS_DATA_AND_MOTS_LIST() { return new this.GMSetting("compiledManySchsDataAndMotsList", []); }
    static get COMPILED_MANY_SCHS_DATA_AND_MOTS_RUNNING() { return new this.GMSetting("compiledManySchsDataAndMotsRunning", false); }
    static get COMPILED_MANY_SCHS_DATA_AND_MOTS_PARTIAL_VALUE() { return new this.GMSetting("compiledManySchsDataAndMotsPartialValue", []); }
    static get COMPILED_MANY_SCHS_DATA_AND_MOTS_VALUE() { return new this.GMSetting("compiledManySchsDataAndMotsValue", []); }

    static get COMPILED_MANY_SCHS_HISTORY_LIST() { return new this.GMSetting("compiledManySchsHistoryList", []); }
    static get COMPILED_MANY_SCHS_HISTORY_RUNNING() { return new this.GMSetting("compiledManySchsHistoryRunning", false); }
    static get COMPILED_MANY_SCHS_HISTORY_VALUE() { return new this.GMSetting("compiledManySchsHistoryValue", []); }

    static get SAVE_ALL_SCHS_DATA_LIST() { return new this.GMSetting("saveAllSchsDataList", []); }

    //Page settings
    static get PAGE_VALUE_SCHS_BID_PERIOD() { return new this.GMSetting("pageValueSchsBidPeriod", ""); }
    static get PAGE_VALUE_SCHS_ACTION() { return new this.GMSetting("pageValueSchsAction", ""); }

    static get PAGE_VALUE_SCHS_DATA_NAME() { return new this.GMSetting("pageValueSchsDataName", ""); }
    static get PAGE_VALUE_SCHS_DATA_BASE() { return new this.GMSetting("pageValueSchsDataBase", ""); }
    static get PAGE_VALUE_SCHS_DATA_EQUIPMENT() { return new this.GMSetting("pageValueSchsDataEquipment", ""); }
    static get PAGE_VALUE_SCHS_DATA_POSITION() { return new this.GMSetting("pageValueSchsDataPosition", ""); }
    static get PAGE_VALUE_SCHS_DATA_EMPLOYEE_NUMBER() { return new this.GMSetting("pageValueSchsDataEmployeeNumber", ""); }
    static get PAGE_VALUE_SCHS_DATA_BID_PERIOD() { return new this.GMSetting("pageValueSchsDataBidPeriod", ""); }
    static get PAGE_VALUE_SCHS_DATA_ROTATION_DATE() { return new this.GMSetting("pageValueSchsDataRotationDate", ""); }

    static get PAGE_VALUE_SCHS_HISTORY_EMPLOYEE_NUMBER() { return new this.GMSetting("pageValueSchsHistoryEmployeeNumber", ""); }
    static get PAGE_VALUE_SCHS_HISTORY_BID_PERIOD() { return new this.GMSetting("pageValueSchsHistoryBidPeriod", ""); }

    static get PAGE_VALUE_ROTATION_NUMBER() { return new this.GMSetting("pageValueRotationNumber", ""); }
    static get PAGE_VALUE_ROTATION_DUPE_NUMBER() { return new this.GMSetting("pageValueRotationDupeNumber", ""); }
    static get PAGE_VALUE_ROTATION_POSITION() { return new this.GMSetting("pageValueRotationPosition", ""); }

    static get PAGE_VALUE_MOTS_EMPLOYEE_NUMBER() { return new this.GMSetting("pageValueMotsEmployeeNumber", ""); }
    static get PAGE_VALUE_MOTS_BID_PERIOD() { return new this.GMSetting("pageValueMotsBidPeriod", ""); }

    static get PAGE_VALUE_MOTV_BID_PERIOD() { return new this.GMSetting("pageValueMotvBidPeriod", ""); }
	
    static get PAGE_VALUE_MOTV_DATA_EMPLOYEE_NUMBER() { return new this.GMSetting("pageValueMotvDataEmployeeNumber", ""); }
    static get PAGE_VALUE_MOTV_DATA_BEGIN_BID_PERIOD() { return new this.GMSetting("pageValueMotvDataBeginBidPeriod", ""); }
    static get PAGE_VALUE_MOTV_DATA_CURRENT_BID_PERIOD() { return new this.GMSetting("pageValueMotvDataCurrentBidPeriod", ""); }

    static get PAGE_VALUE_SICK_EMPLOYEE_NUMBER() { return new this.GMSetting("pageValueSickEmployeeNumber", ""); }

    static get PAGE_VALUE_ROTS_BASE() { return new this.GMSetting("pageValueRotsBase", ""); }
    static get PAGE_VALUE_ROTS_EQUIPMENT() { return new this.GMSetting("pageValueRotsEquipment", ""); }
    static get PAGE_VALUE_ROTS_POSITION() { return new this.GMSetting("pageValueRotsPosition", ""); }
    static get PAGE_VALUE_ROTS_ROTATION_NUMBER() { return new this.GMSetting("pageValueRotsRotationNumber", ""); }

    static get PAGE_VALUE_23M7_BASE() { return new this.GMSetting("pageValue23m7Base", ""); }
    static get PAGE_VALUE_23M7_EQUIPMENT() { return new this.GMSetting("pageValue23m7Equipment", ""); }
    static get PAGE_VALUE_23M7_POSITION() { return new this.GMSetting("pageValue23m7Position", ""); }
    static get PAGE_VALUE_23M7_START_DATE() { return new this.GMSetting("pageValue23m7StartDate", ""); }
    static get PAGE_VALUE_23M7_ROTATION_NUMBER() { return new this.GMSetting("pageValue23m7RotationNumber", ""); }

    static get PAGE_VALUE_SC_AWDS_CATEGORY() { return new this.GMSetting("pageValueScAwdsCategory", ""); }

    //Action settings
    static get DATE_SEARCH_SENIORITY() { return new this.GMSetting("dateSearchSeniority", null); }
    static get DATE_SEARCH_1_START() { return new this.GMSetting("dateSearch1Start", null); }
    static get DATE_SEARCH_1_END() { return new this.GMSetting("dateSearch1End", null); }
    static get DATE_SEARCH_2_START() { return new this.GMSetting("dateSearch2Start", null); }
    static get DATE_SEARCH_2_END() { return new this.GMSetting("dateSearch2End", null); }
    static get DATE_SEARCH_3_START() { return new this.GMSetting("dateSearch3Start", null); }
    static get DATE_SEARCH_3_END() { return new this.GMSetting("dateSearch3End", null); }
    static get DATE_SEARCH_4_START() { return new this.GMSetting("dateSearch4Start", null); }
    static get DATE_SEARCH_4_END() { return new this.GMSetting("dateSearch4End", null); }
    static get DATE_SEARCH_5_START() { return new this.GMSetting("dateSearch5Start", null); }
    static get DATE_SEARCH_5_END() { return new this.GMSetting("dateSearch5End", null); }
    static get DATE_SEARCH_RUNNING() { return new this.GMSetting("dateSearchRunning", false); }

    static get $23M7_SEARCH_EMPLOYEE_NUMBER() { return new this.GMSetting("23m7SearchEmployeeNumber", null); }
    static get $23M7_SEARCH_START() { return new this.GMSetting("23m7SearchStart", null); }
    static get $23M7_SEARCH_END() { return new this.GMSetting("23m7SearchEnd", null); }
    static get $23M7_SEARCH_ROTATION_NUMBER() { return new this.GMSetting("23m7SearchRotationNumber", ""); }
    static get $23M7_SEARCH_RUNNING() { return new this.GMSetting("23m7SearchRunning", false); }

    //Misc settings
    static get ACTIONS_PERSISTENT() { return new this.GMSetting("actionsPersistent", []); }
    static get ACTIONS_CONSUMABLE() { return new this.GMSetting("actionsConsumable", []); }

    static get LOGOUT_CLICKED() { return new this.GMSetting("logoutClicked", false); }

    static ALL() { return Object.entries(Object.getOwnPropertyDescriptors(GMSettings))
                                  .filter(([key, descriptor]) => typeof descriptor.get === "function")
                                  .map(([key]) => GMSettings[key]); }

    static async setupPersistentActions() {
        console.log("Better: Running persistent actions setup");
		
        await GMSettings.ACTIONS_PERSISTENT.set(PageAction.getPersistentActions());
		
        console.log("Better: Done");
    }
	
	static async addAction(action) {
		let actions = await GMSettings.ACTIONS_CONSUMABLE.get();
		actions.push(action);
		await GMSettings.ACTIONS_CONSUMABLE.set(actions);
	}
	
	static async addPageResolverTestResult(page) {
		let result = (await GMSettings.TEST_PAGE_RESOLVERS_RESULT.get() + "\n" + page + ": " + (await PageResolver.getMatchingPages(Menus.getMenu()))).trim();
        await GMSettings.TEST_PAGE_RESOLVERS_RESULT.set(result);
	}

    static async getAllGMValues() {
        const keys = await GM.listValues();
        const values = await Promise.all(keys.map(key => GM.getValue(key)));

        // Combine keys and values into an object
        const allData = {};
        keys.forEach((key, index) => {
            allData[key] = values[index];
        });

        return allData;
    }

    static getDuplicateValues() {
        return GMSettings.ALL().filter((item, index) => GMSettings.ALL().findIndex(s => s.name === item.name) !== index);
    }

    static async getStrayGMValues() {
        return (await GM.listValues()).filter(v => !(GMSettings.ALL().some(a => a.name === v)));
    }

    static clearAllGMValues() {
        GM_listValues().forEach(key => {
            GM_deleteValue(key);
        });
    }
}
