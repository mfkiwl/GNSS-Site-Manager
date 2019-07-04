import { browser } from 'protractor';
import { ElementFinder } from 'protractor';
import { LoginActions } from '../utils/login.actions';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';
import { siteLogMockups } from './test-data';

describe('All Site Log Components', () => {
    let originalTimeout: number;
    let siteId: string = 'ADE1';
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let timestamp: string;
    let deleteReason: string;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

        timestamp = TestUtils.getTimeStamp();
        deleteReason = 'e2e testing - delete an item ' + timestamp;

        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('expect should be able to add and save new items', () => {
        console.log('a) Add and save new items for all instruments/devices');
        siteLogPage.siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            let mockupData = siteLogMockups[siteLogGroup.attributeName];
            siteLogGroup.items.count().then((value: number) => {
                siteLogGroup.noOfItems = value;
                console.log('    Number of ' + siteLogGroup.itemName
                            + ' items before adding new item: ' + value);
                siteLogGroup.addNewItemButton.click().then(() => {
                    console.log('\tAdd a new ' + siteLogGroup.itemName + ' item');
                    siteLogGroup.inputElements.map((inputElement: ElementFinder) => {
                        TestUtils.setInputElementValue(inputElement, mockupData);
                    });
                });
            });
        });

        siteLogPage.save();
    });

    it('expect should have all input values for new items saved', () => {
        console.log('b) Verify input values for all new items saved');
        siteLogPage.reload(siteId);
        siteLogPage.siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            let mockupData = siteLogMockups[siteLogGroup.attributeName];
            TestUtils.checkItemCount(siteLogGroup.items, 'adding a new '
                                    + siteLogGroup.itemName
                                    + ' item', siteLogGroup.noOfItems + 1);
            siteLogGroup.groupHeader.click().then(() => {
                console.log('    Open ' + siteLogGroup.itemName + ' group');
                siteLogGroup.getNewItemHeader().click().then(() => {
                    siteLogGroup.inputElements.map((inputElement: ElementFinder) => {
                        TestUtils.checkInputValueEqual(inputElement, mockupData);
                    });
                    TestUtils.checkInputValueNotNull(siteLogGroup.getNewItemStartDateInput(), 'current StartDate');
                    if(siteLogGroup.noOfItems > 0 && siteLogGroup.hasEndDateInput) {
                        TestUtils.checkInputValueNotNull(siteLogGroup.getSecondItemEndDateInput(), 'previous EndDate');
                    }
                });
            });
        });
    });

    it('expect should be able to delete all new items saved', () => {
        console.log('c) Delete all new items saved');
        siteLogPage.siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            console.log('    Open ' + siteLogGroup.getGroupName() + ' group');
            siteLogGroup.getDeleteButton().click().then(() => {
                siteLogGroup.deleteReasonInput.sendKeys(deleteReason);
                siteLogGroup.confirmDeleteButton.click().then(() => {
                    console.log('\tDeleted ' + TestUtils.getOrdinalNumber(siteLogGroup.newItemIndex + 1) + ' '
                                + siteLogGroup.itemName + ' item for the reason: ' + deleteReason);
                });
            });
        });

        siteLogPage.save();
        siteLogPage.reload(siteId);

        siteLogPage.siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            TestUtils.checkItemCount(siteLogGroup.items,
                                     'deleting a ' + siteLogGroup.itemName + ' item',
                                     siteLogGroup.noOfItems);
        });
    });
});
