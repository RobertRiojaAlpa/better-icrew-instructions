//v7
class PageAction {
    constructor(name, order, onPage, action) {
        this.name = name;
        this.order = order;
        this.onPage = onPage.toString();
        this.action = action.toString();
    }

    name = "";
    order = 0;
    onPage = "";
    data = {};
    action = (() => {}).toString();

    withData(data) {
        this.data = data;
        return this;
    }
	
	static shouldRun(parseAction, page) {
		if(parseAction.onPage.indexOf("(") === -1) {
			return parseAction.onPage === page;
		}
		
		let result = eval(parseAction.onPage)(page);
		
		if(typeof result === "boolean") {
			return result;
		}
		
		console.error("Better: PageAction.onPage is a function that does not return a boolean");
		return false;
	}

    static async runAction(parseAction) {
        return await eval(parseAction.action)(parseAction);
    }
	
	static getPersistentActions() {
		return [
			new PageAction("skipTimeout", -110, Pages.LOGOUT, async (pageAction) => {
				console.log("Better: Handling logout/timeout page");

				//Manually clicked logout
				if(await GMSettings.LOGOUT_CLICKED.get()) {
					console.log("Better: Logout was clicked");
					await GMSettings.LOGOUT_CLICKED.set(false);
					return true;
				}

				//Skip timeout disabled
				if(!await GMSettings.SKIP_TIMEOUT_ENABLE.get()) {
					console.log("Better: Skip timeout disabled");
					return false;
				}

				//Prevent loop
				if(await GMSettings.PAGE_PREVIOUS.get() === Pages.LOGOUT) {
					console.log("Better: Preventing skip timeout loop");
					return true;
				}

				console.log("Better: On timeout page - refreshing");
				window.location.href = Pages.getRefreshUrl();
				return true;
			}),
			new PageAction("autoLogin", -100, Pages.LOGIN, async (pageAction) => {
				console.log("Better: Handling auto login");

				if(!await GMSettings.AUTO_LOGIN_ENABLE.get()) {
					console.log("Better: Auto login disabled");
					return false;
				}

				let mainframeUsername = $("#var_EmployeeName");
				let mainframePassword = $("#var_Password");

				let username = await GMSettings.AUTO_LOGIN_USERNAME.get();
				let password = await GMSettings.AUTO_LOGIN_PASSWORD.get();

				if(username != null && password != null) {
					mainframeUsername.val(username);
					mainframePassword.val(password);
				}

				if(await GMSettings.PAGE_PREVIOUS.get() === Pages.LOGIN) {
					console.log("Better: Preventing login loop");
					return true;
				}

				if(username != null && password != null) {
					console.log("Better: Auto login firing");
					$("#var_OK").click();
					return true;
				}

				return true;
			}),
			new PageAction("skipPilotAdvisories", -90, (p) => Pages.isPilotMenuAdvisory(p), async (pageAction) => {
				if(!Pages.isPilotMenuAdvisory(currentPage)) {
					return false;
				}

				if(!await GMSettings.SKIP_PILOT_MENU_ADVISORIES_ENABLE.get()) {
					console.log("Better: Skip pilot advisories disabled");
					return false;
				}

				if(currentPage === Pages.PILOT_AURVR) {
					$(".cbo3")[0].selectedIndex = 1;
				}

				console.log("Better: Skipping pilot menu advisory page - " + currentPage);
				$("#var_OK").click();
				return true;
			}),
			new PageAction("redirectToAlpaMenu", -80, Pages.PILOT_MAIN_MENU, async (pageAction) => {
				if(!await GMSettings.REDIRECT_TO_ALPA_MENU_ENABLE.get()) {
					console.log("Better: Redirect to ALPA menu disabled");
					return false;
				}

				if(await GMSettings.PAGE_PREVIOUS.get() === Pages.PILOT_MAIN_MENU) {
					console.log("Better: Preventing ALPA menu page loop");
					return false;
				}

				console.log("Better: Redirecting from pilot menu to ALPA menu");
				Pages.clickMenu(12, 2);
				return true;
			}),
			new PageAction("resetTaskFlags", -70, Pages.MAIN_MENU, async (pageAction) => {
				console.log("Better: Resetting task flags");
				
				await GMSettings.COMPILED_SCHS_DATA_RUNNING.set(false);
				await GMSettings.COMPILED_SCHS_DATA_AND_MOTS_RUNNING.set(false);
				await GMSettings.COMPILED_SCHS_DATA_AND_MOTV_RUNNING.set(false);
				await GMSettings.COMPILED_SCHS_HISTORY_RUNNING.set(false);
				await GMSettings.COMPILED_ROTATION_RUNNING.set(false);
				await GMSettings.COMPILED_MOTS_RUNNING.set(false);
				await GMSettings.COMPILED_MOTV_RUNNING.set(false);
				await GMSettings.COMPILED_ROTS_HISTORY_RUNNING.set(false);
				await GMSettings.COMPILED_23M7_RUNNING.set(false);

				await GMSettings.COMPILED_MANY_SCHS_DATA_AND_MOTS_RUNNING.set(false);
				await GMSettings.COMPILED_MANY_SCHS_HISTORY_RUNNING.set(false);
				
				await GMSettings.SAVE_ALL_SCHS_DATA_LIST.set([]);

				await GMSettings.DATE_SEARCH_RUNNING.set(false);
				await GMSettings.$23M7_SEARCH_RUNNING.set(false);
				
				return false;
			}),
			new PageAction("skipConfirmationPage", 90, (p) => Pages.isSkippable(p), async (pageAction) => {
				console.log("Better: Handling skip confirmation page");

				if(!await GMSettings.SKIP_CONFIRM_ENABLE.get()) {
					console.log("Better: Skip confirmation page disabled");
					return false;
				}

				console.log("Better: Skipping confirmation page");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("startingPage", 100, Pages.MAIN_MENU, async (pageAction) => {
				console.log("Better: Handling main menu");

				if(await GMSettings.PAGE_PREVIOUS.get() === Pages.MAIN_MENU) {
					console.log("Better: Preventing main menu loop");
					return false;
				}

				let startingPage = await GMSettings.STARTING_PAGE_VALUE.get();

				if(startingPage === "") {
					console.log("Better: No start page set");
					return false;
				}

				let firstPart = startingPage.split(",")[0];
				let secondPart = startingPage.split(",")[1];

				console.log("Better: Starting page firing");

				Pages.clickMenu(firstPart, secondPart);
				return true;
			}),
		];
	}
	
	static getPageResolverTestActions() {
		let index = 0;
		
		return [
			new PageAction("testPageResolverRecordResultMainMenu", index += 0.1, "", async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.MAIN_MENU);
				
				Pages.clickMenu(0, 0);
                return true;
			}),
			new PageAction("testPageResolverRecordResultSchs", index += 0.1, "", async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SCHS);
				
				$(".txt5").eq(0).val("504483");
				$(".txt5").eq(1).val("02JUN26");
				$(".txt5").eq(2).val("i");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsData", index += 0.1, "", async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SCHS_DATA);
				
				$(".better-rotation-number").eq(0).click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultRotation", index += 0.1, "", async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.ROTATION);
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverGoToSchs", index += 0.1, "", async (pageAction) => {
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testPageResolverGoToSchsHistory", index += 0.1, "", async (pageAction) => {
				$(".txt5").eq(0).val("504483");
				$(".txt5").eq(1).val("02JUN26");
				$(".txt5").eq(2).val("n");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsHistory", index += 0.1, "", async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SCHS_HISTORY);
				
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testPageResolverGoToSchsHistoryScrollMessage", index += 0.1, "", async (pageAction) => {
				$(".txt5").eq(0).val("792096");
				$(".txt5").eq(1).val("01NOV25");
				$(".txt5").eq(2).val("n");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsHistoryScrollMessage", index += 0.1, "", async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SCHS_HISTORY_SCROLL_MESSAGE);
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsHistoryAlternate", index += 0.1, "", async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SCHS_HISTORY_ALTERNATE);
				
				Pages.clickMenu(0, 1);
				return true;
			}),
			new PageAction("testPageResolverRecordResultMots", index += 0.1, "", async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.MOTS);
				
				$(".txt5").eq(0).val("504483");
				$(".txt5").eq(1).val("02JUN26");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultMotsData", index += 0.1, "", async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.MOTS_DATA);
				
				return true;
			}),
		];
	}
}