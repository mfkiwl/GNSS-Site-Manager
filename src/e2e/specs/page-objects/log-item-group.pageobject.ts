import { by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import * as _ from 'lodash';

export abstract class LogItemGroup {

    readonly deletionReasonDialog: ElementFinder = element(by.cssContainingText('.dialog', 'Deletion Reason'));
    readonly deleteReasonInput: ElementFinder = this.deletionReasonDialog.element(by.css('input[type="text"]'));
    readonly confirmDeleteButton: ElementFinder = this.deletionReasonDialog.element(by.buttonText('OK'));
    readonly confirmYesButton: ElementFinder = element(by.buttonText('Yes'));
    readonly itemGroupHeader: ElementFinder;
    readonly newItemButton: ElementFinder;
    readonly prevDateRemovedInput: ElementFinder;

    public items: ElementArrayFinder;
    public currentItemContainer: ElementFinder;
    public currentItemHeader: ElementFinder;
    public firstDeleteButton: ElementFinder;
    public newDateInstalledInput: ElementFinder;
    public inputElements: ElementFinder[];

    public newItemIndex: number;
    public noOfItems: number;
    public itemName: string;
    public attributeName: string;
    public elementName: string;
    public hasEndDateInputField: boolean;

    public constructor(itemName: string) {
        this.newItemIndex = 0;
        this.noOfItems = 0;
        this.itemName = itemName;
        this.attributeName = _.camelCase(itemName);
        this.elementName = _.kebabCase(itemName);
        this.hasEndDateInputField = true;

        this.items = element.all(by.css(this.elementName + '-item'));
        this.itemGroupHeader = element(by.cssContainingText('div.group-header>span.panel-title', this.getGroupName()));
        this.newItemButton = element(by.id('new-' + this.elementName));
        this.currentItemContainer = element(by.id(this.elementName + '-0'));
        this.currentItemHeader = this.currentItemContainer.element(by.css('span.panel-title'));
        this.firstDeleteButton = this.currentItemContainer.element(by.buttonText('Delete'));
        this.newDateInstalledInput = this.currentItemContainer.element(by.css('datetime-input[controlName="startDate"] input'));
        this.prevDateRemovedInput = element(by.id(this.elementName + '-1')).element(by.css('datetime-input[controlName="endDate"] input'));
    }

    public getGroupName(): string {
        return this.itemName + 's';
    }

    public getItemContainer(index: number): ElementFinder {
        this.newItemIndex = index;
        return element(by.id(this.elementName + '-' + index));
    }

    public getDeleteButton(): ElementFinder {
        let itemContainer: ElementFinder = this.getItemContainer(this.newItemIndex);
        return itemContainer.element(by.buttonText('Delete'));
    }

    public enterDateTime(dateInput: ElementFinder, datetimeValue: string) {
        dateInput.sendKeys(datetimeValue);
        let okButton: ElementFinder = element(by.buttonText('OK'));
        okButton.click();
    }
}
