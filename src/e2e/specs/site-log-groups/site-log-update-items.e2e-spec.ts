import { browser } from 'protractor';
import { ElementFinder } from 'protractor';
import { LoginActions } from '../utils/login.actions';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';
import { siteLogTestData } from './test-data';

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

    it('expect should be able to update items', () => {
        console.log('a) Update current items for receiver/antenna groups');
        siteLogPage.siteLogUpdateGroups.map((siteLogGroup: LogItemGroup) => {
            siteLogGroup.items.count().then((value: number) => {
                siteLogGroup.noOfItems = value;
                if (siteLogGroup.noOfItems > 0) {
                    console.log('\tNumber of ' + siteLogGroup.itemName
                               + ' items before update: ' + siteLogGroup.noOfItems);
                    siteLogGroup.updateItemButton.click().then(() => {
                        console.log('\tUpdate current ' + siteLogGroup.itemName + ' item');
                        siteLogGroup.getUpdatableInputFields().map((inputElement: ElementFinder) => {
                            TestUtils.changeInputValue(inputElement, siteLogTestData[siteLogGroup.controlName]);
                        });
                    });
                } else {
                    console.log('\tSkip as no ' + siteLogGroup.itemName + ' items available');
                }
            });
        });

        siteLogPage.save();
    });

    it('expect should have all input values for items updated', () => {
        console.log('b) Verify input values for all items updated');
        siteLogPage.reload(siteId);
        siteLogPage.siteLogUpdateGroups.map((siteLogGroup: LogItemGroup) => {
            if (siteLogGroup.noOfItems > 0) {
                let testData = siteLogTestData[siteLogGroup.controlName];
                TestUtils.checkItemCount(siteLogGroup.items, 'updating a new '
                                        + siteLogGroup.itemName
                                        + ' item', siteLogGroup.noOfItems + 1);
                siteLogGroup.groupHeader.click().then(() => {
                    console.log('\tOpen ' + siteLogGroup.itemName + ' group to check input values modified');
                    siteLogGroup.getNewItemHeader().click().then(() => {
                        siteLogGroup.getUpdatableInputFields().map((inputElement: ElementFinder) => {
                            TestUtils.checkInputValueEqual(inputElement, testData);
                        });
                        TestUtils.checkInputValueNotNull(siteLogGroup.getNewItemStartDateInput(), 'current StartDate');
                        if(siteLogGroup.noOfItems > 0 && siteLogGroup.hasEndDateInput) {
                            TestUtils.checkInputValueNotNull(siteLogGroup.getSecondItemEndDateInput(), 'previous EndDate');
                        }
                    });
                });
            } else {
                console.log('\tSkip as no updated ' + siteLogGroup.itemName + ' item');
            }
        });
    });

    it('expect should be able to delete all new items updated', () => {
        console.log('c) Delete all new items updated');
        siteLogPage.siteLogUpdateGroups.map((siteLogGroup: LogItemGroup) => {
            if (siteLogGroup.noOfItems > 0) {
                siteLogGroup.getDeleteButton().click().then(() => {
                    console.log('\tOpen ' + siteLogGroup.getGroupName() + ' group to delete the new item updated');
                    siteLogGroup.deleteReasonInput.sendKeys(deleteReason);
                    siteLogGroup.confirmDeleteButton.click().then(() => {
                        console.log('\t\tDeleted ' + TestUtils.getOrdinalNumber(siteLogGroup.newItemIndex + 1) + ' '
                                    + siteLogGroup.itemName + ' item for the reason: ' + deleteReason);
                    });
                });
            } else {
                console.log('\tSkip as no updated ' + siteLogGroup.itemName + ' item');
            }
        });

        siteLogPage.save();
        siteLogPage.reload(siteId);

        siteLogPage.siteLogUpdateGroups.map((siteLogGroup: LogItemGroup) => {
            if (siteLogGroup.noOfItems > 0) {
                TestUtils.checkItemCount(siteLogGroup.items,
                                         'deleting a ' + siteLogGroup.itemName + ' item',
                                         siteLogGroup.noOfItems);
            }
        });
    });
});
