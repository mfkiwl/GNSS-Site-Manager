import { browser, ElementFinder, element, by } from 'protractor';

export class HeaderPage {

    readonly loginMenu: ElementFinder = element(by.css('nav.profile-menu'));
    readonly loginLink: ElementFinder = element(by.cssContainingText('a', 'Login'));
    readonly registerLink: ElementFinder = element(by.cssContainingText('a', 'Register'));
    readonly logoutLink: ElementFinder = element(by.cssContainingText('a', 'Logout'));
    readonly profileLink: ElementFinder = element(by.cssContainingText('a', 'Profile'));
    readonly changePasswordLink: ElementFinder = element(by.cssContainingText('a', 'Change Password'));

    readonly navigationMenu: ElementFinder = element(by.css('nav.navigation-menu'));
    readonly selectSiteLink: ElementFinder = element(by.cssContainingText('a', 'Select Site'));
    readonly newSiteLink: ElementFinder = element(by.cssContainingText('a', 'New Site'));
    readonly aboutLink: ElementFinder = element(by.cssContainingText('a', 'About'));

    readonly siteIdMenu: ElementFinder = element(by.css('nav.site-id-menu'));
    readonly saveSiteLink: ElementFinder = element(by.cssContainingText('a', 'Save'));
    readonly revertSiteLink: ElementFinder = element(by.cssContainingText('a', 'Revert'));
    readonly closeSiteLink: ElementFinder = element(by.cssContainingText('a', 'Close'));

    readonly confirmYesButton: ElementFinder = element(by.buttonText('Yes'));

    /**
     * Subclasses should return an element on the page that is always present regardless of state.  It is used to know if are on that page.
     */
    public identifyingElement(): ElementFinder {
        return null;
    };

    public save() {
        this.siteIdMenu.click().then(() => {
            this.saveSiteLink.click().then(() => {
                this.confirmYesButton.click().then(() => {
                    console.log('\tSave all changes made.');
                });
            });
        });
        browser.waitForAngular();
    }

    public revert() {
        this.siteIdMenu.click().then(() => {
            this.revertSiteLink.click().then(() => {
                this.confirmYesButton.click().then(() => {
                    console.log('\t\tRevert the site page');
                });
            });
        });
        browser.waitForAngular();
    }

    /*
     * Reload the sitelog page with given siteId.
     *
     * Sometimes when saving and then immediately reloading the sitelog page, an unexpected alert
     * dialog may occur, asking: "Reload site? Changes you made may not be saved." We have to click
     * the "Reload" button to close this alert so that the e2e tests can proceed.
     *
     * Note: window.location.reload() and browser.refresh() won't work here
     */
    public reload(siteId: string) {
        let url = '/site/' + siteId;
        browser.get(url).catch(() => {
            return browser.switchTo().alert().then((alert) => {
                alert.accept();
                return browser.get(url).then(() => {
                    console.log('\tWarning: close unexpected "Reload" alert dialog and proceed to reload '
                                + siteId + ' sitelog page.');
                });
            });
        }).then(() => {
            console.log('\tReloaded ' + siteId + ' sitelog page.');
        });
        browser.waitForAngular();
    }

    public close(message?: string) {
        this.siteIdMenu.click().then(() => {
            this.closeSiteLink.click().then(() => {
                if (message) {
                    console.log('\t' + message + ' Closed the site page.');
                } else {
                    console.log('\tClosed the site page.');
                }
            });
        });
        browser.waitForAngular();
    }

    public closeAfterConfirmation() {
        this.siteIdMenu.click().then(() => {
            this.closeSiteLink.click().then(() => {
                this.confirmYesButton.isPresent().then((askConfirmation: boolean) => {
                    if (askConfirmation) {
                        this.confirmYesButton.click();
                    }
                });
            });
        });
        browser.waitForAngular();
    }
}
