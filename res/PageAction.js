//v8
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
		let continuityFunction = async (page) => {
			if(await PageResolver.getPage(Menus.getMenu()) !== page) {
				console.log("Better: Unexpected page in page resolver test action");
				await GMSettings.ACTIONS_CONSUMABLE.set([]);
				return true;
			}
			
			return false;
		}
		
		let index = 0;
		
		return [
			new PageAction("testPageResolverRecordResultMainMenu", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(pageAction.data.page)) return true;
				
				GMSettings.addPageResolverTestResult(Pages.MAIN_MENU);
				
				Pages.clickMenu(0, 0);
                return true;
			}).withData({ page: Pages.MAIN_MENU, continuityFunction: continuityFunction.toString(), });,
			/*new PageAction("testPageResolverRecordResultSchs", index += 0.1, Pages.SCHS, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SCHS);
				
				$(".txt5").eq(0).val("504483");
				$(".txt5").eq(1).val("02JUL26");
				$(".txt5").eq(2).val("i");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsData", index += 0.1, Pages.SCHS_DATA, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SCHS_DATA);
				
				$(".better-rotation-number").eq(0).click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultRotation", index += 0.1, Pages.ROTATION, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.ROTATION);
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverGoToSchs", index += 0.1, Pages.SCHS_DATA, async (pageAction) => {
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testPageResolverRecordResultMustBeNOrL", index += 0.1, Pages.MUST_BE_N_OR_L, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.MUST_BE_N_OR_L);
				
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testPageResolverGoToSchsHistory", index += 0.1, Pages.SCHS, async (pageAction) => {
				$(".txt5").eq(0).val("504483");
				$(".txt5").eq(1).val("02JUN26");
				$(".txt5").eq(2).val("n");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsHistory", index += 0.1, Pages.SCHS_HISTORY, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SCHS_HISTORY);
				
				$(".btn9").eq(0).click();
				return true;
			}),
			new PageAction("testPageResolverGoToSchsHistoryScrollMessage", index += 0.1, Pages.SCHS, async (pageAction) => {
				$(".txt5").eq(0).val("792096");
				$(".txt5").eq(1).val("01NOV25");
				$(".txt5").eq(2).val("n");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsHistoryScrollMessage", index += 0.1, Pages.SCHS_HISTORY_SCROLL_MESSAGE, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SCHS_HISTORY_SCROLL_MESSAGE);
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsHistoryAlternate", index += 0.1, Pages.SCHS_HISTORY_ALTERNATE, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SCHS_HISTORY_ALTERNATE);
				
				Pages.clickMenu(0, 1);
				return true;
			}),
			new PageAction("testPageResolverRecordResultMots", index += 0.1, Pages.MOTS, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.MOTS);
				
				$(".txt5").eq(0).val("504483");
				$(".txt5").eq(1).val("02JUN26");
				$(".txt5").eq(2).val("a");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultMotsData", index += 0.1, Pages.MOTS_DATA, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.MOTS_DATA);
				
				Pages.clickMenu(0, 2);
				return true;
			}),
			new PageAction("testPageResolverRecordResultMotv", index += 0.1, Pages.MOTV, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.MOTV);
				
				$(".txt5").eq(0).val("504483");
				$(".txt5").eq(1).val("02JUN26");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultMotvData", index += 0.1, Pages.MOTV_DATA, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.MOTV_DATA);
				
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testPageResolverGoToSchsData", index += 0.1, Pages.SCHS, async (pageAction) => {
				$(".txt5").eq(0).val("504483");
				$(".txt5").eq(1).val("02JUN26");
				$(".txt5").eq(2).val("i");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverGoToSick", index += 0.1, Pages.SCHS_DATA, async (pageAction) => {
				$("#PictureButton006").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSick", index += 0.1, Pages.SICK, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SICK);
				
				$(".btn16").eq(0).click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSickOccurrences", index += 0.1, Pages.SICK_OCCURRENCES, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SICK_OCCURRENCES);
				
				$(".btn9").eq(1).click();
				return true;
			}),
			new PageAction("testPageResolverGoToRots", index += 0.1, Pages.SICK, async (pageAction) => {
				Pages.clickMenu(1, 2);
				return true;
			}),
			new PageAction("testPageResolverRecordResultRots", index += 0.1, Pages.ROTS, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.ROTS);
				
				$(".btn9").eq(1).click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultPcs", index += 0.1, Pages.PCS, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.PCS);
				
				$(".txt5").eq(0).val("o");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResult23m7", index += 0.1, Pages.$23M7, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.$23M7);
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResult23m7Data", index += 0.1, Pages.$23M7_DATA, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.$23M7_DATA);
				
				Pages.clickMenu(1, 1);
				return true;
			}),
			new PageAction("testPageResolverRecordResultPres", index += 0.1, Pages.PRES, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.PRES);
				
				Pages.clickMenu(1, 2);
				return true;
			}),
			new PageAction("testPageResolverGoToRotsHistory", index += 0.1, Pages.ROTS, async (pageAction) => {
				$(".txt5").eq(0).val("atl");
				$(".txt5").eq(1).val("330");
				$(".txt5").eq(2).val("a");
				$(".txt5").eq(3).val("02JUN26");
				$(".txt5").eq(4).val("");
				$(".txt5").eq(5).val("n");
				$(".txt5").eq(6).val("a102");
				$(".txt5").eq(7).val("");
				$(".txt5").eq(8).val("");
				$(".txt5").eq(9).val("y");
				$(".txt5").eq(10).val("");
				$(".txt5").eq(11).val("");
				$(".txt5").eq(12).val("");
				$(".txt5").eq(13).val("");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultRotsHistory", index += 0.1, Pages.ROTS_HISTORY, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.ROTS_HISTORY);
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverGoToReserveOpenTime", index += 0.1, Pages.ROTS, async (pageAction) => {
				$(".txt5").eq(0).val("atl");
				$(".txt5").eq(1).val("330");
				$(".txt5").eq(2).val("a");
				$(".txt5").eq(3).val("");
				$(".txt5").eq(4).val("");
				$(".txt5").eq(5).val("y");
				$(".txt5").eq(6).val("a102");
				$(".txt5").eq(7).val("");
				$(".txt5").eq(8).val("");
				$(".txt5").eq(9).val("");
				$(".txt5").eq(10).val("");
				$(".txt5").eq(11).val("");
				$(".txt5").eq(12).val("");
				$(".txt5").eq(13).val("");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultReserveOpenTime", index += 0.1, Pages.RESERVE_OPEN_TIME, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.RESERVE_OPEN_TIME);
				
				$(".txt5").eq(0).val("atl330a");
				$(".txt5").eq(1).val("02JUN26");
				$(".txt5").eq(2).val("d");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultScAwds", index += 0.1, Pages.SC_AWDS, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SC_AWDS);
				
				Pages.clickMenu(2, 4);
				return true;
			}),
			new PageAction("testPageResolverRecordResultVtss", index += 0.1, Pages.VTSS, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.VTSS);
				
				Pages.clickMenu(3, 2);
				return true;
			}),
			new PageAction("testPageResolverRecordResultUdd", index += 0.1, Pages.UDD, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.UDD);
				
				Pages.clickMenu(4, 0);
				return true;
			}),
			new PageAction("testPageResolverRecordResultSlp", index += 0.1, Pages.SLP, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SLP);
				
				Pages.clickMenu(4, 1);
				return true;
			}),
			new PageAction("testPageResolverRecordResultSwap", index += 0.1, Pages.SWAP, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SWAP);
				
				Pages.clickMenu(4, 3);
				return true;
			}),
			new PageAction("testPageResolverRecordResultLeav", index += 0.1, Pages.LEAV, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.LEAV);
				
				Pages.clickMenu(4, 4);
				return true;
			}),
			new PageAction("testPageResolverRecordResultDty", index += 0.1, Pages.DTY, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.DTY);
				
				Pages.clickMenu(5, 2);
				return true;
			}),
			new PageAction("testPageResolverRecordResultRsRr", index += 0.1, Pages.RS_RR, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.RS_RR);
				
				Pages.clickMenu(6, 1);
				return true;
			}),
			new PageAction("testPageResolverRecordResultRph", index += 0.1, Pages.RPH, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.RPH);
				
				$(".txt2").eq(0).val("03JUL");
				$(".txt2").eq(1).val("ATL");
				$(".txt2").eq(2).val("A100");
				$("#btnOK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultRphData", index += 0.1, Pages.RPH_DATA, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.RPH_DATA);
				
				Pages.clickMenu(6, 3);
				return true;
			}),
			new PageAction("testPageResolverRecordResultMpi", index += 0.1, Pages.MPI, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.MPI);
				
				$(".txt2").eq(0).val("ATL");
				$(".txt2").eq(1).val("A100");
				$(".txt2").eq(2).val("p");
				$("#btnOK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultMpiData", index += 0.1, Pages.MPI_DATA, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.MPI_DATA);
				
				Pages.clickMenu(7, 1);
				return true;
			}),
			new PageAction("testPageResolverRecordResultLayIoe", index += 0.1, Pages.LAY_IOE, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.LAY_IOE);
				
				Pages.clickMenu(7, 3);
				return true;
			}),
			new PageAction("testPageResolverRecordResultPmr", index += 0.1, Pages.PMR, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.PMR);
				
				Pages.clickMenu(7, 5);
				return true;
			}),
			new PageAction("testPageResolverRecordResultScSked", index += 0.1, Pages.SC_SKED, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SC_SKED);
				
				Pages.clickMenu(7, 7);
				return true;
			}),
			new PageAction("testPageResolverRecordResultConf", index += 0.1, Pages.CONF, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.CONF);
				
				Pages.clickMenu(7, 8);
				return true;
			}),
			new PageAction("testPageResolverRecordResultFxday", index += 0.1, Pages.FXDAY, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.FXDAY);
				
				Pages.clickMenu(7, 9);
				return true;
			}),
			new PageAction("testPageResolverRecordResultLayover", index += 0.1, Pages.LAYOVER, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.LAYOVER);
				
				Pages.clickMenu(7, 10);
				return true;
			}),
			new PageAction("testPageResolverRecordResultNqps", index += 0.1, Pages.NQPS, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.NQPS);
				
				Pages.clickMenu(8, 3);
				return true;
			}),
			new PageAction("testPageResolverRecordResultObws", index += 0.1, Pages.OBWS, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.OBWS);
				
				Pages.clickMenu(8, 4);
				return true;
			}),
			new PageAction("testPageResolverRecordResultPscr", index += 0.1, Pages.PSCR, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.PSCR);
				
				Pages.clickMenu(8, 8);
				return true;
			}),
			new PageAction("testPageResolverRecordResultInverse", index += 0.1, Pages.INVERSE, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.INVERSE);
				
				Pages.clickMenu(8, 9);
				return true;
			}),
			new PageAction("testPageResolverRecordResultMaxSc", index += 0.1, Pages.MAX_SC, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.MAX_SC);
				
				Pages.clickMenu(8, 11);
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsome", index += 0.1, Pages.SCHSOME, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.SCHSOME);
				
				Pages.clickMenu(8, 7);
				return true;
			}),
			new PageAction("testPageResolverRecordResultDtc", index += 0.1, Pages.DTC, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.DTC);
				
				$(".txt5").eq(0).val("ATL");
				$(".txt5").eq(1).val("7ER");
				$(".txt5").eq(2).val("a");
				$(".txt5").eq(3).val("01MAY26");
				$(".txt5").eq(4).val("");
				$(".txt5").eq(5).val("N");
				$(".txt5").eq(6).val("scre");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultDtcConfirm", index += 0.1, Pages.DTC_CONFIRM, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.DTC_CONFIRM);
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultDtcData", index += 0.1, Pages.DTC_DATA, async (pageAction) => {
				GMSettings.addPageResolverTestResult(Pages.DTC_DATA);
				
				return true;
			}),*/
		];
	}
}
