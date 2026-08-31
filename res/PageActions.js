//v27
class PageActions {
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
		let continuityFunction = async (page) => {
			if(await PageResolver.getPage(Menus.getMenu()) !== page) {
				alert("Unexpected page in page resolver test action - see console for more information");
				await GMSettings.ACTIONS_CONSUMABLE.set([]);
				return true;
			}
			
			return false;
		}
		
		let index = 0;
		
		let actions = [
			new PageAction("testPageResolverRecordResultMainMenu", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.MAIN_MENU)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MAIN_MENU);
				
				Pages.clickMenu(0, 0);
                return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultSchs", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SCHS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SCHS);
				
				let inputData = InputConstants.SCHS_DATA;
				
				$(".txt5").eq(0).val(inputData.employeeNumber);
				$(".txt5").eq(1).val(inputData.bidPeriod);
				$(".txt5").eq(2).val(inputData.action);
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultSchsData", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SCHS_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SCHS_DATA);
				
				$(".better-rotation-number").eq(0).click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultRotation", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.ROTATION)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.ROTATION);
				
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverGoToSchs", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SCHS_DATA)) return true;
				
				Pages.clickMenu(0, 0);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultMustBeNOrL", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.MUST_BE_N_OR_L)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MUST_BE_N_OR_L);
				
				Pages.clickMenu(0, 0);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverGoToSchsHistory", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SCHS)) return true;
				
				let inputData = InputConstants.SCHS_HISTORY;
				
				$(".txt5").eq(0).val(inputData.employeeNumber);
				$(".txt5").eq(1).val(inputData.bidPeriod);
				$(".txt5").eq(2).val(inputData.action);
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultSchsHistory", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SCHS_HISTORY)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SCHS_HISTORY);
				
				$(".btn9").eq(0).click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverGoToSchsHistoryScrollMessage", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SCHS)) return true;
				
				let inputData = InputConstants.SCHS_HISTORY_ALTERNATE;
				
				$(".txt5").eq(0).val(inputData.employeeNumber);
				$(".txt5").eq(1).val(inputData.bidPeriod);
				$(".txt5").eq(2).val(inputData.action);
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultSchsHistoryScrollMessage", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SCHS_HISTORY_SCROLL_MESSAGE)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SCHS_HISTORY_SCROLL_MESSAGE);
				
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultSchsHistoryAlternate", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SCHS_HISTORY_ALTERNATE)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SCHS_HISTORY_ALTERNATE);
				
				Pages.clickMenu(0, 1);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultMots", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.MOTS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MOTS);
				
				let inputData = InputConstants.MOTS_DATA;
				
				$(".txt5").eq(0).val(inputData.employeeNumber);
				$(".txt5").eq(1).val(inputData.bidPeriod);
				$(".txt5").eq(2).val(inputData.option);
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultMotsData", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.MOTS_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MOTS_DATA);
				
				Pages.clickMenu(0, 2);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultMotv", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.MOTV)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MOTV);
				
				let inputData = InputConstants.MOTV_DATA;
				
				$(".txt5").eq(0).val(inputData.employeeNumber);
				$(".txt5").eq(1).val(inputData.bidPeriod);
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultMotvData", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.MOTV_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MOTV_DATA);
				
				Pages.clickMenu(0, 0);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverGoToSchsData", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SCHS)) return true;
				
				let inputData = InputConstants.SCHS_DATA;
				
				$(".txt5").eq(0).val(inputData.employeeNumber);
				$(".txt5").eq(1).val(inputData.bidPeriod);
				$(".txt5").eq(2).val(inputData.action);
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverGoToSick", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SCHS_DATA)) return true;
				
				$("#PictureButton006").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultSick", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SICK)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SICK);
				
				$(".btn16").eq(0).click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultSickOccurrences", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SICK_OCCURRENCES)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SICK_OCCURRENCES);
				
				$(".btn9").eq(1).click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverGoToRots", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SICK)) return true;
				
				Pages.clickMenu(1, 2);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultRots", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.ROTS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.ROTS);
				
				$(".btn9").eq(1).click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultPcs", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.PCS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.PCS);
				
				$(".txt5").eq(0).val("o");
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResult23m7", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.$23M7)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.$23M7);
				
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResult23m7Data", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.$23M7_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.$23M7_DATA);
				
				Pages.clickMenu(1, 1);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultPres", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.PRES)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.PRES);
				
				Pages.clickMenu(1, 2);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverGoToRotsHistory", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.ROTS)) return true;
				
				let inputData = InputConstants.ROTS_HISTORY;
				
				$(".txt5").eq(0).val(inputData.base);
				$(".txt5").eq(1).val(inputData.equipment);
				$(".txt5").eq(2).val(inputData.position);
				$(".txt5").eq(3).val(inputData.beginDate);
				$(".txt5").eq(4).val(inputData.endDate);
				$(".txt5").eq(5).val(inputData.reserveOpenTime);
				$(".txt5").eq(6).val(inputData.rotationNumber);
				$(".txt5").eq(7).val(inputData.rotationLengthStart);
				$(".txt5").eq(8).val(inputData.rotationLengthEnd);
				$(".txt5").eq(9).val(inputData.history);
				$(".txt5").eq(10).val(inputData.count1);
				$(".txt5").eq(11).val(inputData.count2);
				$(".txt5").eq(12).val(inputData.download);
				$(".txt5").eq(13).val(inputData.printerAddress);
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultRotsHistory", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.ROTS_HISTORY)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.ROTS_HISTORY);
				
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverGoToReserveOpenTime", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.ROTS)) return true;
				
				let inputData = InputConstants.RESERVE_OPEN_TIME;
				
				$(".txt5").eq(0).val(inputData.base);
				$(".txt5").eq(1).val(inputData.equipment);
				$(".txt5").eq(2).val(inputData.position);
				$(".txt5").eq(3).val(inputData.beginDate);
				$(".txt5").eq(4).val(inputData.endDate);
				$(".txt5").eq(5).val(inputData.reserveOpenTime);
				$(".txt5").eq(6).val(inputData.rotationNumber);
				$(".txt5").eq(7).val(inputData.rotationLengthStart);
				$(".txt5").eq(8).val(inputData.rotationLengthEnd);
				$(".txt5").eq(9).val(inputData.history);
				$(".txt5").eq(10).val(inputData.count1);
				$(".txt5").eq(11).val(inputData.count2);
				$(".txt5").eq(12).val(inputData.download);
				$(".txt5").eq(13).val(inputData.printerAddress);
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultReserveOpenTime", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.RESERVE_OPEN_TIME)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.RESERVE_OPEN_TIME);
				
				let inputData = InputConstants.SC_AWDS;
				
				$(".txt5").eq(0).val(inputData.category);
				$(".txt5").eq(1).val(inputData.bidPeriod);
				$(".txt5").eq(2).val(inputData.option);
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultScAwds", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SC_AWDS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SC_AWDS);
				
				Pages.clickMenu(2, 4);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultVtss", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.VTSS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.VTSS);
				
				Pages.clickMenu(3, 2);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultUdd", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.UDD)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.UDD);
				
				Pages.clickMenu(4, 0);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultSlp", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SLP)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SLP);
				
				Pages.clickMenu(4, 1);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultSwap", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SWAP)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SWAP);
				
				Pages.clickMenu(4, 3);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultLeav", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.LEAV)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.LEAV);
				
				Pages.clickMenu(4, 4);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultDty", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.DTY)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.DTY);
				
				Pages.clickMenu(5, 2);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultRsRr", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.RS_RR)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.RS_RR);
				
				Pages.clickMenu(6, 1);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultRph", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.RPH)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.RPH);
				
				let inputData = InputConstants.RPH_DATA;
				
				$(".txt2").eq(0).val(inputData.date);
				$(".txt2").eq(1).val(inputData.base);
				$(".txt2").eq(2).val(inputData.rotationNumber);
				$(".txt2").eq(3).val(inputData.dupeNumber);
				$("#btnOK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultRphData", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.RPH_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.RPH_DATA);
				
				Pages.clickMenu(6, 3);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultMpi", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.MPI)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MPI);
				
				let inputData = InputConstants.MPI_DATA;
				
				$(".txt2").eq(0).val(inputData.base);
				$(".txt2").eq(1).val(inputData.rotationNumber);
				$(".txt2").eq(2).val(inputData.direction);
				$(".txt2").eq(3).val(inputData.date);
				$("#btnOK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultMpiData", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.MPI_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MPI_DATA);
				
				Pages.clickMenu(7, 1);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultLayIoe", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.LAY_IOE)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.LAY_IOE);
				
				Pages.clickMenu(7, 3);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultPmr", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.PMR)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.PMR);
				
				Pages.clickMenu(7, 5);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultScSked", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SC_SKED)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SC_SKED);
				
				Pages.clickMenu(7, 7);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultConf", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.CONF)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.CONF);
				
				Pages.clickMenu(7, 8);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultFxday", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.FXDAY)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.FXDAY);
				
				Pages.clickMenu(7, 9);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultLayover", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.LAYOVER)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.LAYOVER);
				
				Pages.clickMenu(7, 10);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultNqps", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.NQPS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.NQPS);
				
				Pages.clickMenu(8, 3);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultObws", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.OBWS)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.OBWS);
				
				Pages.clickMenu(8, 4);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultPscr", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.PSCR)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.PSCR);
				
				Pages.clickMenu(8, 8);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultInverse", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.INVERSE)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.INVERSE);
				
				Pages.clickMenu(8, 9);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultMaxSc", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.MAX_SC)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.MAX_SC);
				
				Pages.clickMenu(8, 11);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultSchsome", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.SCHSOME)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.SCHSOME);
				
				Pages.clickMenu(8, 7);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultDtc", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.DTC)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.DTC);
				
				let inputData = InputConstants.DTC_DATA;
				
				$(".txt5").eq(0).val(inputData.base);
				$(".txt5").eq(1).val(inputData.equipment);
				$(".txt5").eq(2).val(inputData.position);
				$(".txt5").eq(3).val(inputData.beginDate);
				$(".txt5").eq(4).val(inputData.endDate);
				$(".txt5").eq(5).val(inputData.download);
				$(".txt5").eq(6).val(inputData.scre);
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultDtcConfirm", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.DTC_CONFIRM)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.DTC_CONFIRM);
				
				$("#var_OK").click();
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
			new PageAction("testPageResolverRecordResultDtcData", index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.DTC_DATA)) return true;
				
				await GMSettings.addPageResolverTestResult(Pages.DTC_DATA);
				
				//Back to main menu
				Pages.clickMenu(0, 5);
				return true;
			}).withData({ continuityFunction: continuityFunction.toString(), }),
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
			if(await eval(pageAction.data.continuityFunction)(Pages.MAIN_MENU)) return true;
			
			Pages.clickMenu(pageAction.data.firstUnknownPage[0], pageAction.data.firstUnknownPage[1]);
			return true;
		}).withData({ firstUnknownPage: unknownPages[0], continuityFunction: continuityFunction.toString(), }));
		
		for(let i = 0; i < unknownPages.length; i++) {
			actions.push(new PageAction(`testPageResolverRecordResultUnknown(${unknownPages[i][0]},${unknownPages[i][1]})`, index += 0.1, "", async (pageAction) => {
				if(await eval(pageAction.data.continuityFunction)(Pages.UNKNOWN)) return true;
				
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
			}).withData({ currentUnknownPage: unknownPages[i], nextUnknownPage: unknownPages[i + 1], continuityFunction: continuityFunction.toString(), }));
		}
		
		return actions;
	}

	static getSettingsTestActions() {
		let index = 0;
		let actions = [];
		
		actions.push(...this.getPageBackTestActions(index += 1, true));
		actions.push(...this.getSkipConfirmTestActions(index = 91, true));
		
		actions.push(new PageAction("testSettingsEnd", index += 0.01, "", async (pageAction) => {
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
				let inputData = InputConstants.SCHS_DATA;
				
				$(".txt5").eq(0).val(inputData.employeeNumber);
				$(".txt5").eq(1).val(inputData.bidPeriod);
				$(".txt5").eq(2).val(inputData.action);
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackDisabledSchs3", index += 0.01, "", async (pageAction) => {
				$("#PictureButton001").click();
				return true;
			}),
			new PageAction("testPageBackDisabledSchs4", index += 0.01, "", async (pageAction) => {
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
				let inputData = InputConstants.SCHS_DATA;
				
				$(".txt5").eq(0).val(inputData.employeeNumber);
				$(".txt5").eq(1).val(inputData.bidPeriod);
				$(".txt5").eq(2).val(inputData.action);
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackEnabledSchs3", index += 0.01, "", async (pageAction) => {
				$("#PictureButton001").click();
				return true;
			}),
			new PageAction("testPageBackEnabledSchs4", index += 0.01, "", async (pageAction) => {
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
				let inputData = InputConstants.MOTS_DATA;
				
				$(".txt5").eq(0).val(inputData.employeeNumber);
				$(".txt5").eq(1).val(inputData.bidPeriod);
				$(".txt5").eq(2).val(inputData.option);
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackDisabledMots3", index += 0.01, "", async (pageAction) => {
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
				let inputData = InputConstants.MOTS_DATA;
				
				$(".txt5").eq(0).val(inputData.employeeNumber);
				$(".txt5").eq(1).val(inputData.bidPeriod);
				$(".txt5").eq(2).val(inputData.option);
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackEnabledMots3", index += 0.01, "", async (pageAction) => {
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
				let inputData = InputConstants.DTC_DATA;
				
				$(".txt5").eq(0).val(inputData.base);
				$(".txt5").eq(1).val(inputData.equipment);
				$(".txt5").eq(2).val(inputData.position);
				$(".txt5").eq(3).val(inputData.beginDate);
				$(".txt5").eq(4).val(inputData.endDate);
				$(".txt5").eq(5).val(inputData.download);
				$(".txt5").eq(6).val(inputData.scre);
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackDisabledDtc3", index += 0.01, "", async (pageAction) => {
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackDisabledDtc4", index += 0.01, "", async (pageAction) => {
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
				let inputData = InputConstants.DTC_DATA;
				
				$(".txt5").eq(0).val(inputData.base);
				$(".txt5").eq(1).val(inputData.equipment);
				$(".txt5").eq(2).val(inputData.position);
				$(".txt5").eq(3).val(inputData.beginDate);
				$(".txt5").eq(4).val(inputData.endDate);
				$(".txt5").eq(5).val(inputData.download);
				$(".txt5").eq(6).val(inputData.scre);
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackEnabledDtc3", index += 0.01, "", async (pageAction) => {
				$("#var_OK").click();
				return true;
			}),
			new PageAction("testPageBackEnabledDtc4", index += 0.01, "", async (pageAction) => {
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
		
		if(!pageAction.isBeingRunTogether) {
			actions.push(new PageAction("testPageBackEnd", index += 0.01, "", async (pageAction) => {
				console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
				alert("Results logged to console");
				return true;
			}));
		}
		
		return actions;
	}
	
	static getSkipConfirmTestActions(index = 91, isBeingRunTogether = false) {
		let actions = [
			new PageAction("testSkipConfirmDisabledDtc1", index += 0.01, "", async (pageAction) => {
				await GMSettings.TEST_SETTINGS_TEMP_VALUE.set(await GMSettings.SKIP_CONFIRM_ENABLE.get());
				
				await GMSettings.SKIP_CONFIRM_ENABLE.set(false);
				
				Pages.clickMenu(8, 7);
				return true;
			}),
			new PageAction("testSkipConfirmDisabledDtc2", index += 0.01, "", async (pageAction) => {
				let inputData = InputConstants.DTC_DATA;
				
				$(".txt5").eq(0).val(inputData.base);
				$(".txt5").eq(1).val(inputData.equipment);
				$(".txt5").eq(2).val(inputData.position);
				$(".txt5").eq(3).val(inputData.beginDate);
				$(".txt5").eq(4).val(inputData.endDate);
				$(".txt5").eq(5).val(inputData.download);
				$(".txt5").eq(6).val(inputData.scre);
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
				let inputData = InputConstants.DTC_DATA;
				
				$(".txt5").eq(0).val(inputData.base);
				$(".txt5").eq(1).val(inputData.equipment);
				$(".txt5").eq(2).val(inputData.position);
				$(".txt5").eq(3).val(inputData.beginDate);
				$(".txt5").eq(4).val(inputData.endDate);
				$(".txt5").eq(5).val(inputData.download);
				$(".txt5").eq(6).val(inputData.scre);
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
		];
		
		if(!pageAction.isBeingRunTogether) {
			actions.push(new PageAction("testSkipConfirmEnd", index += 0.01, "", async (pageAction) => {
				console.log("Settings test results:\n" + await GMSettings.TEST_SETTINGS_RESULT.get());
				alert("Results logged to console");
				return true;
			}));
		}
		
		return actions;
	}
}
