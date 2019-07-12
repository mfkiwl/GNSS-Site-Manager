import { browser } from 'protractor';
import { LoginActions } from '../utils/login.actions';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { SiteAdministrationPage } from '../page-objects/site-administration.pageobject';

describe('All Site Log Components', () => {
    let adminUser: string = 'user.x';
    let adminPassword: string = 'gumby123X';
    let siteId: string = 'ADE1';
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let siteAdminPage: SiteAdministrationPage;

    let isOpenData: boolean;
    let selectedNetwork: string;
    let noOfAvailableNetworks: number;
    let noOfAsignedNetworks: number;

    beforeAll(() => {
        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login(adminUser, adminPassword);
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
        siteAdminPage = new SiteAdministrationPage();
    });

    it('expect should be able to change data permission flag and add/remove networks', () => {
        console.log('a) Change data permission flag and add/remove networks');
        siteAdminPage.siteAdministrationHeader.click().then(() => {
            console.log('\tOpen site Administration panel');
            siteAdminPage.openDataRadioButton.getAttribute('checked').then((value: string) => {
                isOpenData = (value === 'true');
                console.log('\tInitial status of Data Permission: isOpenData = ' + isOpenData);
                if (isOpenData) {
                    siteAdminPage.closedDataRadioButton.click().then(() => {
                        console.log('\tChanged Data Permission to "Closed Data"');
                    });
                } else {
                    siteAdminPage.openDataRadioButton.click().then(() => {
                        console.log('\tChanged Data Permission to "Open Data"');
                    });
                }
            });

            siteAdminPage.availableNetworkOptions.count().then((count1: number) => {
                noOfAvailableNetworks = count1;
                console.log('\tNumber of "Available" networks: ' + noOfAvailableNetworks);

                siteAdminPage.assignedNetworkOptions.count().then((count2: number) => {
                    noOfAsignedNetworks = count2;
                    console.log('\tNumber of "Assigned" networks: ' + noOfAsignedNetworks);
                });

                siteAdminPage.availableNetworkOptions.first().getText().then((value) => {
                    selectedNetwork = value;
                    siteAdminPage.availableNetworkOptions.first().click().then(() => {
                        siteAdminPage.addNetworkButton.click().then(() => {
                            console.log('\tAdd "'+selectedNetwork+'" to "Assigned" network list.');
                        });
                    });
                });
            });
        });

        siteLogPage.save();
    });

    it('expect should be able to verify all changes saved', () => {
        console.log('b) Verify all changes saved');
        siteLogPage.reload(siteId);

        siteAdminPage.siteAdministrationHeader.click().then(() => {
            siteAdminPage.openDataRadioButton.getAttribute('checked').then((value: string) => {
                let isChecked: boolean = (value === 'true');
                expect(isChecked).toEqual(!isOpenData);
                console.log('\tExpect "Open Data" radio button is ' + (isOpenData ? 'un' : '')
                           + 'checked: ' + (isChecked !== isOpenData));
            });
            siteAdminPage.closedDataRadioButton.getAttribute('checked').then((value: string) => {
                let isChecked: boolean = (value === 'true');
                expect(isChecked).toEqual(isOpenData);
                console.log('\tExpect "Closed Data" radio button is ' + (isOpenData ? '' : 'un')
                           + 'checked: ' + (isChecked === isOpenData));
            });

            siteAdminPage.availableNetworkOptions.count().then((count: number) => {
                console.log('\tExpect number of "Available" networks is '
                           + (noOfAvailableNetworks - 1) + ': '
                           + (count === noOfAvailableNetworks - 1));
                expect(count).toBe(noOfAvailableNetworks - 1);
            });
            siteAdminPage.assignedNetworkOptions.count().then((count: number) => {
                console.log('\tExpect number of "Assigned" networks is '
                           + (noOfAsignedNetworks + 1) + ': '
                           + (count === noOfAsignedNetworks + 1));
                expect(count).toBe(noOfAsignedNetworks + 1);
            });
        });
    });

    it('expect should be able to restore changes made for data permission and networks', () => {
        console.log('c) Restore changes made for data permission and networks');
        if (isOpenData) {
            siteAdminPage.openDataRadioButton.click().then(() => {
                console.log('\tChanged Data Permission to "Open Data"');
            });
        } else {
            siteAdminPage.closedDataRadioButton.click().then(() => {
                console.log('\tChanged Data Permission to "Closed Data"');
            });
        }

        siteAdminPage.getAssignedNetworkOption(selectedNetwork).click().then(() => {
            siteAdminPage.removeNetworkButton.click().then(() => {
                console.log('\tRemove "'+selectedNetwork+'" from "Assigned" network list.');
            });
        });

        siteLogPage.save();
    });

    it('expect should be able to verify all changes restored', () => {
        console.log('d) Verify all changes restored');
        siteLogPage.reload(siteId);

        siteAdminPage.siteAdministrationHeader.click().then(() => {
            siteAdminPage.openDataRadioButton.getAttribute('checked').then((value: string) => {
                let isChecked: boolean = (value === 'true');
                expect(isChecked).toEqual(isOpenData);
                console.log('\tExpect "Open Data" radio button is ' + (isOpenData ? '' : 'un')
                           + 'checked: ' + (isChecked === isOpenData));
            });
            siteAdminPage.closedDataRadioButton.getAttribute('checked').then((value: string) => {
                let isChecked: boolean = (value === 'true');
                expect(isChecked).toEqual(!isOpenData);
                console.log('\tExpect "Closed Data" radio button is ' + (isOpenData ? 'un' : '')
                           + 'checked: ' + (isChecked !== isOpenData));
            });

            siteAdminPage.availableNetworkOptions.count().then((count: number) => {
                console.log('\tExpect number of "Available" networks is '
                           + noOfAvailableNetworks + ': '
                           + (count === noOfAvailableNetworks));
                expect(count).toBe(noOfAvailableNetworks);
            });
            siteAdminPage.assignedNetworkOptions.count().then((count: number) => {
                console.log('\tExpect number of "Assigned" networks is '
                           + noOfAsignedNetworks + ': '
                           + (count === noOfAsignedNetworks));
                expect(count).toBe(noOfAsignedNetworks);
            });
        });
    });
});
