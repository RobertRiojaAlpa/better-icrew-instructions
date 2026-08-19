//v16
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
		if(parseAction.onPage.length === 0) {
			return true;
		}
		
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
}