//v1
class Menus {
    static get UNKNOWN() { return "Unknown"; }
    static get NONE() { return "None"; }
    static get ALPA_MENU() { return "ALPA menu"; }
    static get PILOT_MENU() { return "Pilot menu"; }

    static getMenu() {
        let numberOfMenuItems = Pages.getAPMenusWindow(window.top)?.APMenus.length;

        if(numberOfMenuItems === undefined) {
            return Menus.NONE;
        }

        if(numberOfMenuItems === 11) {
            return Menus.ALPA_MENU;
        }

        if(numberOfMenuItems === 14) {
            return Menus.PILOT_MENU;
        }

        console.warn("Better: Unknown number of menu items - " + numberOfMenuItems);
        return Menus.UNKNOWN;
    }
}