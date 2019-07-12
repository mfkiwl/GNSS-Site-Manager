import { by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { BasePage } from './base.pageobject';

export class SiteAdministrationPage extends BasePage {
    readonly siteAdministrationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Administration'));
    readonly dataPermissionHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Data Permission'));
    readonly networksHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Networks'));

    // Two radio buttons in "Data Permission" panel: Open Data & Closed Data
    readonly openDataLabel: ElementFinder = element(by.cssContainingText('label', 'Open Data'));
    readonly openDataRadioButton: ElementFinder = this.openDataLabel.element(by.css('input[type="radio"]'));
    readonly closedDataLabel: ElementFinder = element(by.cssContainingText('label', 'Closed Data'));
    readonly closedDataRadioButton: ElementFinder = this.closedDataLabel.element(by.css('input[type="radio"]'));

    // Two list boxes in "Networks" panel: Available & Assigned
    readonly networksListBoxes: ElementArrayFinder = element.all(by.css('div[class="list-box-body"]'));
    readonly availableNetworkListBox: ElementFinder = this.networksListBoxes.first();
    readonly availableNetworkOptions: ElementArrayFinder = this.availableNetworkListBox.all(by.css('div span[class="list-box-item"]'));
    readonly assignedNetworkListBox: ElementFinder = this.networksListBoxes.last();
    readonly assignedNetworkOptions: ElementArrayFinder = this.assignedNetworkListBox.all(by.css('div span[class="list-box-item"]'));

    // Two submit buttons in "Networks" panel: add/remove network
    readonly addNetworkButton: ElementFinder = element(by.css('div button i[class="glyphicon glyphicon-arrow-right"]'));
    readonly removeNetworkButton: ElementFinder = element(by.css('div button i[class="glyphicon glyphicon-arrow-left"]'));

    /**
     * Return the network defined by name from the "Assigned" network panel
     */
    public getAssignedNetworkOption(networkName: string): ElementFinder {
        return this.assignedNetworkListBox.element(by.cssContainingText('div span[class="list-box-item"]', networkName));
    }
}
