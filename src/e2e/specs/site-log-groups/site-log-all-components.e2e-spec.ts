import { browser } from 'protractor';
import { LoginActions } from '../utils/login.actions';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { InputField, LogItemGroup } from '../page-objects/log-item-group.pageobject';
import { GnssReceiverGroup } from '../page-objects/gnss-receiver-group.pageobject';
import { GnssAntennaGroup } from '../page-objects/gnss-antenna-group.pageobject';
import { SurveyedLocalTieGroup } from '../page-objects/surveyed-local-tie-group.pageobject';
import { FrequencyStandardGroup } from '../page-objects/frequency-standard-group.pageobject';
import { CollocationInformationGroup } from '../page-objects/collocation-information-group.pageobject';
import { LocalEpisodicEffectGroup } from '../page-objects/local-episodic-effect-group.pageobject';
import { MeteorologicalSensorGroup } from '../page-objects/meteorological-sensor-group.pageobject';
import { OtherInstrumentationGroup } from '../page-objects/other-instrumentation-group.pageobject';
import { RadioInterferenceGroup } from '../page-objects/radio-interference-group.pageobject';
import { SignalObstructionGroup } from '../page-objects/signal-obstruction-group.pageobject';
import { MultipathSourceGroup } from '../page-objects/multipath-source-group.pageobject';
import { siteLogMockups } from './test-data-mockups';

describe('All Site Log Components', () => {
    let originalTimeout: number;
    let siteId: string = 'ADE1';
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let siteLogGroups: LogItemGroup[];
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

        // In the same order as shown in web UI
        siteLogGroups = [
            new GnssReceiverGroup(),
            new GnssAntennaGroup(),
            new SurveyedLocalTieGroup(),
            new FrequencyStandardGroup(),
            new CollocationInformationGroup(),
            new LocalEpisodicEffectGroup(),
            new MeteorologicalSensorGroup('Humidity Sensor'),
            new MeteorologicalSensorGroup('Pressure Sensor'),
            new MeteorologicalSensorGroup('Temperature Sensor'),
            new MeteorologicalSensorGroup('Water Vapor Sensor'),
            new OtherInstrumentationGroup(),
            new RadioInterferenceGroup(),
            new SignalObstructionGroup(),
            new MultipathSourceGroup(),
        ];
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('expect should be able to add and save new items', () => {
        console.log('a) Add and save new items for all instruments/devices');
        siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            let mockupData = siteLogMockups[siteLogGroup.attributeName];
            siteLogGroup.items.count().then((value: number) => {
                siteLogGroup.noOfItems = value;
                console.log('    Number of ' + siteLogGroup.itemName
                            + ' items before adding new item: ' + value);
                siteLogGroup.newItemButton.click().then(() => {
                    console.log('\tAdd a new ' + siteLogGroup.itemName + ' item');
                    siteLogGroup.inputFields.map((inputField: InputField) => {
                        inputField.setValue(mockupData[inputField.name]);
                    });
                });
            });
        });

        siteLogPage.save();
    });

    it('expect should have all input values for new items saved', () => {
        console.log('b) Verify input values for all new items saved');
        siteLogPage.reload(siteId);
        siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            let mockupData = siteLogMockups[siteLogGroup.attributeName];
            TestUtils.checkItemCount(siteLogGroup.items, 'adding a new '
                                    + siteLogGroup.itemName
                                    + ' item', siteLogGroup.noOfItems + 1);
            siteLogGroup.itemGroupHeader.click().then(() => {
                console.log('    Open ' + siteLogGroup.itemName + ' group');
                siteLogGroup.currentItemHeader.click().then(() => {
                    siteLogGroup.inputFields.map((inputField: InputField) => {
                        TestUtils.checkInputValueEqual(inputField.elem,
                                                       inputField.name,
                                                       mockupData[inputField.name]);
                    });
                    TestUtils.checkInputValueNotNull(siteLogGroup.newDateInstalledInput, 'current DateInstalled');
                    if(siteLogGroup.noOfItems > 0 && siteLogGroup.hasEndDate) {
                        TestUtils.checkInputValueNotNull(siteLogGroup.prevDateRemovedInput, 'previous DateRemoved');
                    }
                });
            });
        });
    });

    it('expect should be able to delete all new items saved', () => {
        console.log('c) Delete all new items saved');
        siteLogGroups.map((siteLogGroup: LogItemGroup) => {
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

        siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            TestUtils.checkItemCount(siteLogGroup.items,
                                     'deleting a ' + siteLogGroup.itemName + ' item',
                                     siteLogGroup.noOfItems);
        });
    });
});
