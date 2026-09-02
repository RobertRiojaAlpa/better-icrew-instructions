//v52
class PageActions {
	static async continuityFunction(page) {
		if(await PageResolver.getPage(Menus.getMenu()) !== page) {
			alert("Unexpected page in test action - see console for more information");
			await GMSettings.ACTIONS_CONSUMABLE.set([]);
			return true;
		}
		
		return false;
	}
	
	static getPersistentActions() {
		return [
			new PageAction("skipTimeout", -110, (p) => p === Pages.LOGOUT || p === Pages.GATEWAY_TIMEOUT, async (pageAction) => {
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
				if(await GMSettings.PAGE_PREVIOUS.get() === Pages.LOGOUT || await GMSettings.PAGE_PREVIOUS.get() === Pages.GATEWAY_TIMEOUT) {
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

				let username = await GMSettings.AUTO_LOGIN_USERNAME.get();

				if(username?.length > 0) {
					$("#var_EmployeeName").val(username);
				}
				
				let password = await GMSettings.AUTO_LOGIN_PASSWORD.get();

				if(password?.length > 0) {
					$("#var_Password").val(password);
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
				await GMSettings.COMPILED_MANY_SCHS_DATA_AND_MOTS_LIST.set([]);
				
				await GMSettings.COMPILED_MANY_SCHS_HISTORY_RUNNING.set(false);
				await GMSettings.COMPILED_MANY_SCHS_HISTORY_LIST.set([]);
				
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
		
		let actions = [
			new PageAction("testPageResolverRecordResultMainMenu", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MAIN_MENU)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MAIN_MENU);
				
				Pages.clickMenu(0, 0);
                return true;
			}),
			new PageAction("testPageResolverRecordResultSchs", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SCHS);
				
				InputConstants.SCHS_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsData", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SCHS_DATA);
				
				$(".better-rotation-number").eq(0).click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultRotation", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.ROTATION)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.ROTATION);
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverGoToSchs", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS_DATA)) return true;
				
				Pages.clickMenu(0, 0);
				return true;
			}),
			/*new PageAction("testPageResolverRecordResultMustBeNOrL", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MUST_BE_N_OR_L)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MUST_BE_N_OR_L);
				
				Pages.clickMenu(0, 0);
				return true;
			}),*/
			new PageAction("testPageResolverGoToSchsHistory", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				InputConstants.SCHS_HISTORY.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsHistory", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS_HISTORY)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SCHS_HISTORY);
				
				$(".btn9").eq(0).click();
				return true;
			}),
			new PageAction("testPageResolverGoToSchsHistoryScrollMessage", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				InputConstants.SCHS_HISTORY_ALTERNATE.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsHistoryScrollMessage", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS_HISTORY_SCROLL_MESSAGE)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SCHS_HISTORY_SCROLL_MESSAGE);
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsHistoryAlternate", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS_HISTORY_ALTERNATE)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SCHS_HISTORY_ALTERNATE);
				
				Pages.clickMenu(0, 1);
				return true;
			}),
			new PageAction("testPageResolverRecordResultMots", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MOTS);
				
				InputConstants.MOTS_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultMotsData", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTS_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MOTS_DATA);
				
				Pages.clickMenu(0, 2);
				return true;
			}),
			new PageAction("testPageResolverRecordResultMotv", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTV)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MOTV);
				
				InputConstants.MOTV_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultMotvData", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTV_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MOTV_DATA);
				
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testPageResolverGoToSchsData", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				InputConstants.SCHS_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverGoToSick", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS_DATA)) return true;
				
				$("#PictureButton006").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSick", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SICK)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SICK);
				
				$(".btn16").eq(0).click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultSickOccurrences", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SICK_OCCURRENCES)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SICK_OCCURRENCES);
				
				$(".btn9").eq(1).click();
				return true;
			}),
			new PageAction("testPageResolverGoToRots", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SICK)) return true;
				
				Pages.clickMenu(1, 2);
				return true;
			}),
			new PageAction("testPageResolverRecordResultRots", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.ROTS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.ROTS);
				
				$(".btn9").eq(1).click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultPcs", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.PCS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.PCS);
				
				$(".txt5").eq(0).val("o");
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResult23m7", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.$23M7)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.$23M7);
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResult23m7Data", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.$23M7_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.$23M7_DATA);
				
				Pages.clickMenu(1, 1);
				return true;
			}),
			new PageAction("testPageResolverRecordResultPres", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.PRES)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.PRES);
				
				Pages.clickMenu(1, 2);
				return true;
			}),
			new PageAction("testPageResolverGoToRotsHistory", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.ROTS)) return true;
				
				InputConstants.ROTS_HISTORY.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultRotsHistory", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.ROTS_HISTORY)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.ROTS_HISTORY);
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverGoToReserveOpenTime", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.ROTS)) return true;
				
				InputConstants.RESERVE_OPEN_TIME.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultReserveOpenTime", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.RESERVE_OPEN_TIME)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.RESERVE_OPEN_TIME);
				
				InputConstants.SC_AWDS.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultScAwds", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SC_AWDS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SC_AWDS);
				
				Pages.clickMenu(2, 4);
				return true;
			}),
			new PageAction("testPageResolverRecordResultVtss", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.VTSS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.VTSS);
				
				Pages.clickMenu(3, 2);
				return true;
			}),
			new PageAction("testPageResolverRecordResultUdd", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.UDD)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.UDD);
				
				Pages.clickMenu(4, 0);
				return true;
			}),
			new PageAction("testPageResolverRecordResultSlp", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SLP)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SLP);
				
				Pages.clickMenu(4, 1);
				return true;
			}),
			new PageAction("testPageResolverRecordResultSwap", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SWAP)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SWAP);
				
				Pages.clickMenu(4, 3);
				return true;
			}),
			new PageAction("testPageResolverRecordResultLeav", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.LEAV)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.LEAV);
				
				Pages.clickMenu(4, 4);
				return true;
			}),
			new PageAction("testPageResolverRecordResultDty", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.DTY)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.DTY);
				
				Pages.clickMenu(5, 2);
				return true;
			}),
			new PageAction("testPageResolverRecordResultRsRr", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.RS_RR)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.RS_RR);
				
				Pages.clickMenu(6, 1);
				return true;
			}),
			new PageAction("testPageResolverRecordResultRph", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.RPH)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.RPH);
				
				InputConstants.RPH_DATA.insert();
				$("#btnOK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultRphData", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.RPH_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.RPH_DATA);
				
				Pages.clickMenu(6, 3);
				return true;
			}),
			new PageAction("testPageResolverRecordResultMpi", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MPI)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MPI);
				
				InputConstants.MPI_DATA.insert();
				$("#btnOK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultMpiData", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MPI_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MPI_DATA);
				
				Pages.clickMenu(7, 1);
				return true;
			}),
			new PageAction("testPageResolverRecordResultLayIoe", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.LAY_IOE)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.LAY_IOE);
				
				Pages.clickMenu(7, 3);
				return true;
			}),
			new PageAction("testPageResolverRecordResultPmr", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.PMR)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.PMR);
				
				Pages.clickMenu(7, 5);
				return true;
			}),
			new PageAction("testPageResolverRecordResultScSked", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SC_SKED)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SC_SKED);
				
				Pages.clickMenu(7, 7);
				return true;
			}),
			new PageAction("testPageResolverRecordResultConf", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.CONF)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.CONF);
				
				Pages.clickMenu(7, 8);
				return true;
			}),
			new PageAction("testPageResolverRecordResultFxday", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.FXDAY)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.FXDAY);
				
				Pages.clickMenu(7, 9);
				return true;
			}),
			new PageAction("testPageResolverRecordResultLayover", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.LAYOVER)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.LAYOVER);
				
				Pages.clickMenu(7, 10);
				return true;
			}),
			new PageAction("testPageResolverRecordResultNqps", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.NQPS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.NQPS);
				
				Pages.clickMenu(8, 3);
				return true;
			}),
			new PageAction("testPageResolverRecordResultObws", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.OBWS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.OBWS);
				
				Pages.clickMenu(8, 4);
				return true;
			}),
			new PageAction("testPageResolverRecordResultPscr", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.PSCR)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.PSCR);
				
				Pages.clickMenu(8, 8);
				return true;
			}),
			new PageAction("testPageResolverRecordResultInverse", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.INVERSE)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.INVERSE);
				
				Pages.clickMenu(8, 9);
				return true;
			}),
			new PageAction("testPageResolverRecordResultMaxSc", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MAX_SC)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MAX_SC);
				
				Pages.clickMenu(8, 11);
				return true;
			}),
			new PageAction("testPageResolverRecordResultSchsome", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHSOME)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SCHSOME);
				
				Pages.clickMenu(8, 7);
				return true;
			}),
			new PageAction("testPageResolverRecordResultDtc", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.DTC)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.DTC);
				
				InputConstants.DTC_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultDtcConfirm", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.DTC_CONFIRM)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.DTC_CONFIRM);
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageResolverRecordResultDtcData", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.DTC_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.DTC_DATA);
				
				//Back to main menu
				Pages.clickMenu(0, 5);
				return true;
			}),
		];
		
		let unknownPages = [
			[0, 3],
			[0, 4],
			//[0, 5],
			[1, 0],
			[1, 3],
			[1, 4],
			[2, 0],
			[2, 1],
			[2, 2],
			[2, 3],
			[2, 5],
			//[2, 6],
			[3, 0],
			[3, 1],
			[3, 3],
			[3, 4],
			[4, 2],
			[4, 5],
			[4, 6],
			[4, 7],
			[5, 0],
			[5, 1],
			[5, 3],
			[5, 4],
			[5, 5],
			[5, 6],
			[6, 0],
			[6, 2],
			[6, 4],
			[6, 5],
			[6, 6],
			[6, 7],
			[6, 8],
			[6, 9],
			[6, 10],
			[6, 11],
			[6, 12],
			[6, 13],
			[6, 14],
			//[6, 15],
			[7, 0],
			[7, 2],
			[7, 4],
			[7, 6],
			[7, 11],
			[7, 12],
			[7, 13],
			[8, 0],
			//[8, 1],
			[8, 2],
			//[8, 5],
			[8, 6],
			[8, 10],
			[8, 12],
		];
		
		actions.push(new PageAction("testPageResolverGoToFirstUnknown", index += 0.1, "", async (pageAction) => {
			if(await PageActions.continuityFunction(Pages.MAIN_MENU)) return true;
			
			Pages.clickMenu(pageAction.data.firstUnknownPage[0], pageAction.data.firstUnknownPage[1]);
			return true;
		}).withData({ firstUnknownPage: unknownPages[0], }));
		
		for(let i = 0; i < unknownPages.length; i++) {
			actions.push(new PageAction(`testPageResolverRecordResultUnknown(${unknownPages[i][0]},${unknownPages[i][1]})`, index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.UNKNOWN)) return true;
				
				await GMSettings.addPageResolverTestResult(`${pageAction.data.currentUnknownPage[0]}, ${pageAction.data.currentUnknownPage[1]}`);
				
				if(pageAction.data.nextUnknownPage !== undefined) {
					Pages.clickMenu(pageAction.data.nextUnknownPage[0], pageAction.data.nextUnknownPage[1]);
				} else {
					let resolversResult = await GMSettings.TEST_PAGE_RESOLVERS_RESULT.get();
					let usedResolvers = [...new Set(resolversResult.split("\n").map(r => TextUtils.skipIncluding(r, ": ")))];
					let unusedResolvers = PageResolver.ALL().map(r => r.name.slice(4, -4).toUpperCase()).filter(r => !usedResolvers.includes(r));

					console.log("Resolver test results:\n" + resolversResult);
					console.log("Used resolvers:", usedResolvers);
					console.log("Unused resolvers:", unusedResolvers);
					alert("Results logged to console");
				}
				return true;
			}).withData({ currentUnknownPage: unknownPages[i], nextUnknownPage: unknownPages[i + 1], }));
		}
		
		return actions;
	}

	static getSettingsTestActions() {
		let index = 0;
		let actions = [];
		
		actions.push(...this.getPageBackTestActions(index += 1, true));
		actions.push(...this.getSchsBidPeriodStickyTestActions(index += 1, true));
		actions.push(...this.getSchsActionTestActions(index += 1, true));
		actions.push(...this.getSchsHistoryPilotViewedTestActions(index += 1, true));
		actions.push(...this.getMotsBidPeriodStickyTestActions(index += 1, true));
		actions.push(...this.getMotsOptionInsertATestActions(index += 1, true));
		actions.push(...this.getMotvBidPeriodStickyTestActions(index += 1, true));
		actions.push(...this.getRotsHistoryInsertYTestActions(index += 1, true));
		
		actions.push(...this.getSkipConfirmTestActions(true));
		index = 92;
		
		actions.push(...this.getStartingPageTestActions(true));
		index = 102;
		
		actions.push(new PageAction("testSettingsEnd", index, "", async (pageAction) => {
			console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
			alert("Results logged to console");
            return true;
		}));
		
		return actions;
	}

	static getPageBackTestActions(index = 0, isBeingRunTogether = false) {
		let actions = [
			new PageAction("testPageBackDisabledSchs1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.PAGE_BACK_ENABLE.get());
				
				await GMSettings.PAGE_BACK_ENABLE.set(false);
				
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testPageBackDisabledSchs2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				InputConstants.SCHS_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackDisabledSchs3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS_DATA)) return true;
				
				$("#PictureButton001").click();
				return true;
			}),
			new PageAction("testPageBackDisabledSchs4", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTS_DATA)) return true;
				
				$("#PictureButton").click();
				return true;
			}),
			new PageAction("testPageBackDisabledSchs5", index += 0.01, "", async (pageAction) => {
				await GMSettings.addSettingsTestResult("pageBack (SCHS, disabled)", currentPage === Pages.MAIN_MENU);
				
				await GMSettings.PAGE_BACK_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
			
			new PageAction("testPageBackEnabledSchs1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.PAGE_BACK_ENABLE.get());
				
				await GMSettings.PAGE_BACK_ENABLE.set(true);
				
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testPageBackEnabledSchs2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				InputConstants.SCHS_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackEnabledSchs3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS_DATA)) return true;
				
				$("#PictureButton001").click();
				return true;
			}),
			new PageAction("testPageBackEnabledSchs4", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTS_DATA)) return true;
				
				$("#PictureButton").click();
				return true;
			}),
			new PageAction("testPageBackEnabledSchs5", index += 0.01, "", async (pageAction) => {
				await GMSettings.addSettingsTestResult("pageBack (SCHS, enabled)", currentPage === Pages.SCHS);
				
				await GMSettings.PAGE_BACK_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
			
			new PageAction("testPageBackDisabledMots1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.PAGE_BACK_ENABLE.get());
				
				await GMSettings.PAGE_BACK_ENABLE.set(false);
				
				Pages.clickMenu(0, 1);
				return true;
			}),
			new PageAction("testPageBackDisabledMots2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTS)) return true;
				
				InputConstants.MOTS_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackDisabledMots3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTS_DATA)) return true;
				
				$("#PictureButton").click();
				return true;
			}),
			new PageAction("testPageBackDisabledMots4", index += 0.01, "", async (pageAction) => {
				await GMSettings.addSettingsTestResult("pageBack (MOTS, disabled)", currentPage === Pages.MAIN_MENU);
				
				await GMSettings.PAGE_BACK_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
			
			new PageAction("testPageBackEnabledMots1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.PAGE_BACK_ENABLE.get());
				
				await GMSettings.PAGE_BACK_ENABLE.set(true);
				
				Pages.clickMenu(0, 1);
				return true;
			}),
			new PageAction("testPageBackEnabledMots2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTS)) return true;
				
				InputConstants.MOTS_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackEnabledMots3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTS_DATA)) return true;
				
				$("#PictureButton").click();
				return true;
			}),
			new PageAction("testPageBackEnabledMots4", index += 0.01, "", async (pageAction) => {
				await GMSettings.addSettingsTestResult("pageBack (MOTS, enabled)", currentPage === Pages.MOTS);
				
				await GMSettings.PAGE_BACK_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
			
			new PageAction("testPageBackDisabledDtc1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.PAGE_BACK_ENABLE.get());
				
				await GMSettings.PAGE_BACK_ENABLE.set(false);
				
				Pages.clickMenu(8, 7);
				return true;
			}),
			new PageAction("testPageBackDisabledDtc2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.DTC)) return true;
				
				InputConstants.DTC_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackDisabledDtc3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.DTC_CONFIRM)) return true;
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackDisabledDtc4", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.DTC_DATA)) return true;
				
				$(".btn13").eq(5).click();
				return true;
			}),
			new PageAction("testPageBackDisabledDtc5", index += 0.01, "", async (pageAction) => {
				await GMSettings.addSettingsTestResult("pageBack (DTC, disabled)", currentPage === Pages.MAIN_MENU);
				
				await GMSettings.PAGE_BACK_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
			
			new PageAction("testPageBackEnabledDtc1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.PAGE_BACK_ENABLE.get());
				
				await GMSettings.PAGE_BACK_ENABLE.set(true);
				
				Pages.clickMenu(8, 7);
				return true;
			}),
			new PageAction("testPageBackEnabledDtc2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.DTC)) return true;
				
				InputConstants.DTC_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackEnabledDtc3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.DTC_CONFIRM)) return true;
				
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackEnabledDtc4", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.DTC_DATA)) return true;
				
				$(".btn13").eq(5).click();
				return true;
			}),
			new PageAction("testPageBackDisabledDtc5", index += 0.01, "", async (pageAction) => {
				await GMSettings.addSettingsTestResult("pageBack (DTC, enabled)", currentPage === Pages.DTC);
				
				await GMSettings.PAGE_BACK_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
		];
		
		if(!isBeingRunTogether) {
			actions.push(new PageAction("testPageBackEnd", index += 0.01, "", async (pageAction) => {
				console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
				alert("Results logged to console");
				return true;
			}));
		}
		
		return actions;
	}
	
	static getSkipConfirmTestActions(isBeingRunTogether = false) {
		let index = 91;
		
		let actions = [
			new PageAction("testSkipConfirmDisabledDtc1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.SKIP_CONFIRM_ENABLE.get());
				
				await GMSettings.SKIP_CONFIRM_ENABLE.set(false);
				
				Pages.clickMenu(8, 7);
				return true;
			}),
			new PageAction("testSkipConfirmDisabledDtc2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.DTC)) return true;
				
				InputConstants.DTC_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testSkipConfirmDisabledDtc3", index += 0.01, "", async (pageAction) => {
				await GMSettings.addSettingsTestResult("skipConfirm (DTC, disabled)", currentPage === Pages.DTC_CONFIRM);
				
				await GMSettings.SKIP_CONFIRM_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
			
			new PageAction("testSkipConfirmEnabledDtc1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.SKIP_CONFIRM_ENABLE.get());
				
				await GMSettings.SKIP_CONFIRM_ENABLE.set(true);
				
				Pages.clickMenu(8, 7);
				return true;
			}),
			new PageAction("testSkipConfirmEnabledDtc2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.DTC)) return true;
				
				InputConstants.DTC_DATA.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testSkipConfirmEnabledDtc3", index += 0.01, "", async (pageAction) => {
				await GMSettings.addSettingsTestResult("skipConfirm (DTC, enabled)", currentPage === Pages.DTC_DATA);
				
				await GMSettings.SKIP_CONFIRM_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
			
			new PageAction("testSkipConfirmDisabledSchsHistoryScrollMessage1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.SKIP_CONFIRM_ENABLE.get());
				
				await GMSettings.SKIP_CONFIRM_ENABLE.set(false);
				
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testSkipConfirmDisabledSchsHistoryScrollMessage2", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				InputConstants.SCHS_HISTORY_ALTERNATE.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testSkipConfirmDisabledSchsHistoryScrollMessage3", index += 0.01, "", async (pageAction) => {
				await GMSettings.addSettingsTestResult("skipConfirm (SCHS History Alternate, disabled)", currentPage === Pages.SCHS_HISTORY_SCROLL_MESSAGE);
				
				await GMSettings.SKIP_CONFIRM_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
			
			new PageAction("testSkipConfirmEnabledSchsHistoryScrollMessage1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.SKIP_CONFIRM_ENABLE.get());
				
				await GMSettings.SKIP_CONFIRM_ENABLE.set(true);
				
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testSkipConfirmEnabledSchsHistoryScrollMessage2", index += 0.1, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				InputConstants.SCHS_HISTORY_ALTERNATE.insert();
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testSkipConfirmEnabledSchsHistoryScrollMessage3", index += 0.01, "", async (pageAction) => {
				await GMSettings.addSettingsTestResult("skipConfirm (SCHS History Alternate, disabled)", currentPage === Pages.SCHS_HISTORY_ALTERNATE);
				
				await GMSettings.SKIP_CONFIRM_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
		];
		
		if(!isBeingRunTogether) {
			actions.push(new PageAction("testSkipConfirmEnd", index += 0.01, "", async (pageAction) => {
				console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
				alert("Results logged to console");
				return true;
			}));
		}
		
		return actions;
	}
	
	static getStartingPageTestActions(isBeingRunTogether = false) {
		let actions2 = this.$getStartingPageTestActions2();
		
		let actions = [
			new PageAction("testStartingPageNone1", 99, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.STARTING_PAGE_VALUE.get());
				
				await GMSettings.STARTING_PAGE_VALUE.set("");
				
				Pages.clickMenu(0, 1);
				return true;
			}),
			new PageAction("testStartingPageNone2", 99.1, "", async (pageAction) => {
				//Back to main menu
				Pages.clickMenu(0, 5);
				return true;
			}),
			new PageAction("testStartingPageNone3", 101, "", async (pageAction) => {
				await GMSettings.addSettingsTestResult("startingPage (none)", currentPage === Pages.MAIN_MENU);
				
				await GMSettings.STARTING_PAGE_VALUE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				GMSettings.addAction(...pageAction.data.actions2);
				
				Pages.clickMenu(0, 1);
                return true;
			}).withData({ actions2: actions2, }),
		];
		
		if(!isBeingRunTogether) {
			actions.push(new PageAction("testStartingPageEnd", 101.1, "", async (pageAction) => {
				console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
				alert("Results logged to console");
				return true;
			}));
		}
		
		return actions;
	}
	
	static $getStartingPageTestActions2() {
		return [
			new PageAction("testStartingPageSchs1", 99, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.STARTING_PAGE_VALUE.get());
				
				await GMSettings.STARTING_PAGE_VALUE.set("0,0");
				
				//Back to main menu
				Pages.clickMenu(0, 5);
				return true;
			}),
			new PageAction("testStartingPageSchs2", 101, "", async (pageAction) => {
				await GMSettings.addSettingsTestResult("startingPage (SCHS)", currentPage === Pages.SCHS);
				
				await GMSettings.STARTING_PAGE_VALUE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
		];
	}

	static getSchsBidPeriodStickyTestActions(index = 0, isBeingRunTogether = false) {
		let actions = [
			new PageAction("testSchsBidPeriodSticky1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.SCHS_BID_PERIOD_STICKY_ENABLE.get());
				
				await GMSettings.SCHS_BID_PERIOD_STICKY_ENABLE.set(false);
				
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testSchsBidPeriodSticky2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				await GMSettings.addSettingsTestResult("schsBidPeriodSticky (disabled)", $(".txt5").eq(1).val() === "");
				
				await GMSettings.SCHS_BID_PERIOD_STICKY_ENABLE.set(true);
				$(".txt5").eq(1).val(InputConstants.SCHS_DATA.data.bidPeriod);
				$(".txt5").eq(1).trigger('input');
				
				Pages.clickMenu(0, 0);
                return true;
			}),
			new PageAction("testSchsBidPeriodSticky3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				await GMSettings.addSettingsTestResult("schsBidPeriodSticky (enabled)", $(".txt5").eq(1).val() === InputConstants.SCHS_DATA.data.bidPeriod);
				
				await GMSettings.SCHS_BID_PERIOD_STICKY_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
		];
		
		if(!isBeingRunTogether) {
			actions.push(new PageAction("testSchsBidPeriodStickyEnd", index += 0.01, "", async (pageAction) => {
				console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
				alert("Results logged to console");
				return true;
			}));
		}
		
		return actions;
	}

	static getSchsActionTestActions(index = 0, isBeingRunTogether = false) {
		let actions = [
			new PageAction("testSchsAction1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.SCHS_ACTION_TYPE.get());
				await GMSettings.TEST_SETTINGS_TEMP_VALUE_2.set(await GMSettings.SCHS_ACTION_DEFAULT_VALUE.get());
				
				await GMSettings.SCHS_ACTION_TYPE.set("");
				await GMSettings.SCHS_ACTION_DEFAULT_VALUE.set("");
				
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testSchsAction2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				await GMSettings.addSettingsTestResult("schsAction (none)", $(".txt5").eq(2).val() === "");
				
				await GMSettings.SCHS_ACTION_TYPE.set("default");
				await GMSettings.SCHS_ACTION_DEFAULT_VALUE.set("n");
				
				Pages.clickMenu(0, 0);
                return true;
			}),
			new PageAction("testSchsAction3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				await GMSettings.addSettingsTestResult("schsAction (default, part 1)", $(".txt5").eq(2).val() === "n");
				
				$(".txt5").eq(2).val("i");
				$(".txt5").eq(2).trigger('input');
				
				Pages.clickMenu(0, 0);
                return true;
			}),
			new PageAction("testSchsAction4", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				await GMSettings.addSettingsTestResult("schsAction (default, part 2)", $(".txt5").eq(2).val() === "n");
				
				await GMSettings.SCHS_ACTION_TYPE.set("sticky");
				$(".txt5").eq(2).val("i");
				$(".txt5").eq(2).trigger('input');
				
				Pages.clickMenu(0, 0);
                return true;
			}),
			new PageAction("testSchsAction5", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				await GMSettings.addSettingsTestResult("schsAction (sticky)", $(".txt5").eq(2).val() === "i");
				
				await GMSettings.SCHS_ACTION_TYPE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				await GMSettings.SCHS_ACTION_DEFAULT_VALUE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE_2.get());
				
				Pages.clickMenu(0, 0);
                return true;
			}),
		];
		
		if(!isBeingRunTogether) {
			actions.push(new PageAction("testSchsActionEnd", index += 0.01, "", async (pageAction) => {
				console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
				alert("Results logged to console");
				return true;
			}));
		}
		
		return actions;
	}
	
	static getSchsHistoryPilotViewedTestActions(index = 0, isBeingRunTogether = false) {
		let actions = [
			new PageAction("testSchsHistoryPilotViewed1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.SCHS_HISTORY_PILOT_VIEWED_TYPE.get());
				
				await GMSettings.SCHS_HISTORY_PILOT_VIEWED_TYPE.set("");
				
				Pages.clickMenu(0, 0);
				return true;
			}),
			new PageAction("testSchsHistoryPilotViewed2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				await GMSettings.addSettingsTestResult("schsHistoryPilotViewed (none)", $(".txt5").eq(4).val() === "Y");
				
				await GMSettings.SCHS_HISTORY_PILOT_VIEWED_TYPE.set("sticky");
				
				$(".txt5").eq(4).val("y");
				$(".txt5").eq(4).trigger('input');
				
				Pages.clickMenu(0, 0);
                return true;
			}),
			new PageAction("testSchsHistoryPilotViewed3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				await GMSettings.addSettingsTestResult("schsHistoryPilotViewed (sticky)", $(".txt5").eq(4).val() === "y");
				
				await GMSettings.SCHS_HISTORY_PILOT_VIEWED_TYPE.set("y");
				
				Pages.clickMenu(0, 0);
                return true;
			}),
			new PageAction("testSchsHistoryPilotViewed4", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				await GMSettings.addSettingsTestResult("schsHistoryPilotViewed (Y)", $(".txt5").eq(4).val() === "Y");
				
				await GMSettings.SCHS_HISTORY_PILOT_VIEWED_TYPE.set("n");
				
				Pages.clickMenu(0, 0);
                return true;
			}),
			new PageAction("testSchsHistoryPilotViewed5", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.SCHS)) return true;
				
				await GMSettings.addSettingsTestResult("schsHistoryPilotViewed (N)", $(".txt5").eq(4).val() === "N");
				
				await GMSettings.SCHS_HISTORY_PILOT_VIEWED_TYPE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				Pages.clickMenu(0, 0);
                return true;
			}),
		];
		
		if(!isBeingRunTogether) {
			actions.push(new PageAction("testSchsHistoryPilotViewedEnd", index += 0.01, "", async (pageAction) => {
				console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
				alert("Results logged to console");
				return true;
			}));
		}
		
		return actions;
	}
	
	static getMotsBidPeriodStickyTestActions(index = 0, isBeingRunTogether = false) {
		let actions = [
			new PageAction("testMotsBidPeriodSticky1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.MOTS_BID_PERIOD_STICKY_ENABLE.get());
				
				await GMSettings.MOTS_BID_PERIOD_STICKY_ENABLE.set(false);
				
				Pages.clickMenu(0, 1);
				return true;
			}),
			new PageAction("testMotsBidPeriodSticky2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTS)) return true;
				
				await GMSettings.addSettingsTestResult("motsBidPeriodSticky (disabled)", $(".txt5").eq(1).val() === "");
				
				await GMSettings.MOTS_BID_PERIOD_STICKY_ENABLE.set(true);
				$(".txt5").eq(1).val(InputConstants.MOTS_DATA.data.bidPeriod);
				$(".txt5").eq(1).trigger('input');
				
				Pages.clickMenu(0, 1);
                return true;
			}),
			new PageAction("testMotsBidPeriodSticky3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTS)) return true;
				
				await GMSettings.addSettingsTestResult("motsBidPeriodSticky (enabled)", $(".txt5").eq(1).val() === InputConstants.MOTS_DATA.data.bidPeriod);
				
				await GMSettings.MOTS_BID_PERIOD_STICKY_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
		];
		
		if(!isBeingRunTogether) {
			actions.push(new PageAction("testMotsBidPeriodStickyEnd", index += 0.01, "", async (pageAction) => {
				console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
				alert("Results logged to console");
				return true;
			}));
		}
		
		return actions;
	}
	
	static getMotsOptionInsertATestActions(index = 0, isBeingRunTogether = false) {
		let actions = [
			new PageAction("testMotsOptionInsertA1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.MOTS_INSERT_A_ENABLE.get());
				
				await GMSettings.MOTS_INSERT_A_ENABLE.set(false);
				
				Pages.clickMenu(0, 1);
				return true;
			}),
			new PageAction("testMotsOptionInsertA2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTS)) return true;
				
				await GMSettings.addSettingsTestResult("motsOptionInsertA (disabled)", $(".txt5").eq(2).val() === "");
				
				await GMSettings.MOTS_INSERT_A_ENABLE.set(true);
				
				Pages.clickMenu(0, 1);
                return true;
			}),
			new PageAction("testMotsOptionInsertA3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTS)) return true;
				
				await GMSettings.addSettingsTestResult("motsOptionInsertA (enabled)", $(".txt5").eq(2).val() === "a");
				
				await GMSettings.MOTS_INSERT_A_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
		];
		
		if(!isBeingRunTogether) {
			actions.push(new PageAction("testMotsOptionInsertAEnd", index += 0.01, "", async (pageAction) => {
				console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
				alert("Results logged to console");
				return true;
			}));
		}
		
		return actions;
	}
	
	static getMotvBidPeriodStickyTestActions(index = 0, isBeingRunTogether = false) {
		let actions = [
			new PageAction("testMotvBidPeriodSticky1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.MOTV_BID_PERIOD_STICKY_ENABLE.get());
				
				await GMSettings.MOTV_BID_PERIOD_STICKY_ENABLE.set(false);
				
				Pages.clickMenu(0, 2);
				return true;
			}),
			new PageAction("testMotvBidPeriodSticky2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTV)) return true;
				
				await GMSettings.addSettingsTestResult("motvBidPeriodSticky (disabled)", $(".txt5").eq(1).val() === "");
				
				await GMSettings.MOTV_BID_PERIOD_STICKY_ENABLE.set(true);
				$(".txt5").eq(1).val(InputConstants.MOTV_DATA.data.bidPeriod);
				$(".txt5").eq(1).trigger('input');
				
				Pages.clickMenu(0, 2);
                return true;
			}),
			new PageAction("testMotvBidPeriodSticky3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.MOTV)) return true;
				
				await GMSettings.addSettingsTestResult("motvBidPeriodSticky (enabled)", $(".txt5").eq(1).val() === InputConstants.MOTV_DATA.data.bidPeriod);
				
				await GMSettings.MOTV_BID_PERIOD_STICKY_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
		];
		
		if(!isBeingRunTogether) {
			actions.push(new PageAction("testMotvBidPeriodStickyEnd", index += 0.01, "", async (pageAction) => {
				console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
				alert("Results logged to console");
				return true;
			}));
		}
		
		return actions;
	}

	static getRotsHistoryInsertYTestActions(index = 0, isBeingRunTogether = false) {
		let actions = [
			new PageAction("testRotsHistoryInsertY1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.ROTS_INSERT_Y_ENABLE.get());
				
				await GMSettings.ROTS_INSERT_Y_ENABLE.set(false);
				
				Pages.clickMenu(1, 2);
				return true;
			}),
			new PageAction("testRotsHistoryInsertY2", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.ROTS)) return true;
				
				await GMSettings.addSettingsTestResult("rotsHistoryInsertY (disabled)", $(".txt5").eq(9).val() === "");
				
				await GMSettings.ROTS_INSERT_Y_ENABLE.set(true);
				
				Pages.clickMenu(1, 2);
                return true;
			}),
			new PageAction("testRotsHistoryInsertY3", index += 0.01, "", async (pageAction) => {
				if(await PageActions.continuityFunction(Pages.ROTS)) return true;
				
				await GMSettings.addSettingsTestResult("rotsHistoryInsertY (enabled)", $(".txt5").eq(9).val() === "y");
				
				await GMSettings.ROTS_INSERT_Y_ENABLE.set(await GMSettings.TEST_SETTINGS_TEMP_VALUE.get());
				
				//Back to main menu
				Pages.clickMenu(0, 5);
                return true;
			}),
		];
		
		if(!isBeingRunTogether) {
			actions.push(new PageAction("testRotsHistoryInsertYEnd", index += 0.01, "", async (pageAction) => {
				console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
				alert("Results logged to console");
				return true;
			}));
		}
		
		return actions;
	}
}