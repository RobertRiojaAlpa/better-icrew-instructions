//v4
class PageAction {
    static get NAME_SKIP_TIMEOUT() { return "skipTimeout"; }
    static get NAME_AUTO_LOGIN() { return "autoLogin"; }
    static get NAME_SKIP_PILOT_ADVISORIES() { return "skipPilotAdvisories"; }
    static get NAME_REDIRECT_TO_ALPA_MENU() { return "redirectToAlpaMenu"; }
    static get NAME_RESET_TASK_FLAGS() { return "resetTaskFlags"; }
    static get NAME_STARTING_PAGE() { return "startingPage"; }
    static get NAME_SKIP_CONFIRMATION_PAGE() { return "skipConfirmationPage"; }

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
		let evalOnPage = eval(parseAction.onPage);
		
		if(typeof evalOnPage === "string") {
			return evalOnPage === page;
		} else if(typeof evalOnPage === "function") {
			let result = evalOnPage(page);
			
			if(typeof result === "boolean") {
				return result;
			}
			
			console.error("Better: PageAction.onPage is a function that does not return a boolean");
			return;
		}
		
		console.error("Better: PageAction.onPage is not a string or function");
	}

    static async runAction(parseAction) {
        return await eval(parseAction.action)(parseAction);
    }
}