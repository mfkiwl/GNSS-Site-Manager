import { browser } from 'protractor';
import { ElementFinder } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { LoginActions } from '../utils/login.actions';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { ResponsiblePartyGroup } from '../page-objects/responsible-party-group.pageobject';
import { responsiblePartyMockup } from './test-data';

/**
 * Test of adding/deleting new responsible parties if it is allowed
 * 1) Site Contacts and Site Data Centers are arrays with 0 ~ n items and therefore are always allowed to add new items;
 * 2) Site Owner, Site Data Source and Site Metadata Custodian are allowed to add new item only if it is empty.
 */
describe('Site Information Component', () => {
    let siteId: string = 'ADE1';
    let originalTimeout: number;
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('expect should be able to add new items or backup values for existing items', () => {
        console.log('a) Add new items or backup values for existing items');
        siteLogPage.siteInformationHeader.click().then(() => {
            siteLogPage.responsibleParties.map((responsibleParty: ResponsiblePartyGroup) => {
                responsibleParty.groupHeader.click().then(() => {
                    if (responsibleParty.canAddNewItem) {
                        responsibleParty.items.count().then((value: number) => {
                            responsibleParty.noOfItems = value;
                            console.log('    Number of ' + responsibleParty.itemName
                                        + ' items before adding new item: ' + value);
                            responsibleParty.addNewItemButton.click().then(() => {
                                console.log('\tAdd a new ' + responsibleParty.itemName + ' item');
                                responsibleParty.inputElements.map((inputElement: ElementFinder) => {
                                    TestUtils.setInputElementValue(inputElement, responsiblePartyMockup);
                                });
                            });
                        });
                    } else {
                        responsibleParty.inputElements.map((inputElement: ElementFinder) => {
                            TestUtils.changeInputValue(inputElement, responsiblePartyMockup, responsibleParty.backupModel);
                        });
                    }
                });
            });
        });
        siteLogPage.save();
    });

    it('expect should have all input values saved or modified', () => {
        console.log('b) Verify input values saved for new items or modified for existing items');
        siteLogPage.reload(siteId);
        siteLogPage.siteInformationHeader.click().then(() => {
            siteLogPage.responsibleParties.map((responsibleParty: ResponsiblePartyGroup) => {
                if (responsibleParty.canAddNewItem) {
                    responsibleParty.updateNewItemElements(responsiblePartyMockup.positionName);
                    TestUtils.checkItemCount(responsibleParty.items,
                                             'adding a new ' + responsibleParty.itemName + ' item',
                                             responsibleParty.noOfItems + 1);
                    console.log('    Open ' + responsibleParty.itemName + ' group');
                } else {
                    console.log('    Open ' + responsibleParty.itemName + ' group for checking modified values');
                }

                responsibleParty.groupHeader.click().then(() => {
                    if (responsibleParty.canAddNewItem && responsibleParty.noOfItems > 0) {
                        responsibleParty.getNewItemHeader().click();
                    }
                    responsibleParty.inputElements.map((inputElement: ElementFinder) => {
                        TestUtils.checkInputValueEqual(inputElement, responsiblePartyMockup);
                    });
                });
            });
        });
    });

    it('expect should be able to delete new items saved or restore backup values', () => {
        console.log('c) Delete new items saved or restore backup values for existing items');
        siteLogPage.responsibleParties.map((responsibleParty: ResponsiblePartyGroup) => {
            if (responsibleParty.canAddNewItem) {
                console.log('    Open ' + responsibleParty.getGroupName() + ' group');
                responsibleParty.getDeleteButton().click().then(() => {
                    responsibleParty.confirmYesButton.click().then(() => {
                        console.log('\tDeleted ' + TestUtils.getOrdinalNumber(responsibleParty.newItemIndex + 1)
                                    + ' ' + responsibleParty.itemName + ' item.');
                    });
                });
            } else {
                console.log('    Open ' + responsibleParty.itemName + ' group for restoring backup values');
                responsibleParty.inputElements.map((inputElement: ElementFinder) => {
                    TestUtils.changeInputValue(inputElement, responsibleParty.backupModel);
                });
            }
        });

        siteLogPage.save();
        siteLogPage.reload(siteId);
        siteLogPage.siteInformationHeader.click().then(() => {
            siteLogPage.responsibleParties.map((responsibleParty: ResponsiblePartyGroup) => {
                if (responsibleParty.canAddNewItem) {
                    TestUtils.checkItemCount(responsibleParty.items,
                                             'deleting a ' + responsibleParty.itemName + ' item',
                                             responsibleParty.noOfItems);
                } else {
                    responsibleParty.groupHeader.click().then(() => {
                        console.log('    Open ' + responsibleParty.itemName + ' group for checking backup values');
                        responsibleParty.inputElements.map((inputElement: ElementFinder) => {
                            TestUtils.checkInputValueEqual(inputElement, responsibleParty.backupModel);
                        });
                    });
                }
            });
        });
    });
});
