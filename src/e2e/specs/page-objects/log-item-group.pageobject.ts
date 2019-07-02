import { by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import * as _ from 'lodash';

export class InputField {
    public name: string;
    public type: string;
    public elem: ElementFinder;

    public constructor(name: string, type: string, elem: ElementFinder = null) {
        this.name = name;
        this.type = type;
        this.elem = elem;
    }

    public getElementCss(): string {
        let css: string = this.type + '-input[controlName="' + this.name + '"] ';
        css += (this.type === 'textarea') ? 'textarea' : 'input';
        return css;
    }

    public setValue(value: string | number) {
        if (!value && value !== 0) {   // false: 0, "", null, undefined, and NaN in typescript
            this.elem.clear();
        } else if (typeof value === 'number') {
            this.elem.sendKeys(value.toString());
        } else {
            this.elem.sendKeys(value);
        }
    }
}

export abstract class LogItemGroup {

    readonly deletionReasonDialog: ElementFinder = element(by.cssContainingText('.dialog', 'Deletion Reason'));
    readonly deleteReasonInput: ElementFinder = this.deletionReasonDialog.element(by.css('input[type="text"]'));
    readonly confirmDeleteButton: ElementFinder = this.deletionReasonDialog.element(by.buttonText('OK'));
    readonly confirmYesButton: ElementFinder = element(by.buttonText('Yes'));
    readonly itemGroupHeader: ElementFinder;
    readonly newItemButton: ElementFinder;
    readonly prevDateRemovedInput: ElementFinder;

    public currentItemHeader: ElementFinder;
    public firstDeleteButton: ElementFinder;
    public newDateInstalledInput: ElementFinder;
    public items: ElementArrayFinder;
    public inputFields: InputField[];

    public newItemIndex: number;
    public noOfItems: number;
    public itemName: string;
    public attributeName: string;
    public elementName: string;
    public hasEndDate: boolean;

    public constructor(itemName: string) {
        this.newItemIndex = 0;
        this.noOfItems = 0;
        this.itemName = itemName;
        this.attributeName = _.camelCase(itemName);
        this.elementName = _.kebabCase(itemName);
        this.hasEndDate = true;

        this.items = element.all(by.css(this.elementName + '-item'));
        this.newItemButton = element(by.id('new-' + this.elementName));
        this.itemGroupHeader = element(by.cssContainingText('div.group-header>span.panel-title', this.getGroupName()));
        this.prevDateRemovedInput = element(by.id(this.elementName + '-1')).element(by.css('datetime-input[controlName="endDate"] input'));

        this.setupInputFields();
        this.updateInputElements();
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

    public updateInputElements(itemIndex: number = 0) {
        let itemContainer: ElementFinder = this.getItemContainer(itemIndex);
        this.currentItemHeader = itemContainer.element(by.css('span.panel-title'));
        this.firstDeleteButton = itemContainer.element(by.buttonText('Delete'));
        this.newDateInstalledInput = itemContainer.element(by.css('datetime-input[controlName="startDate"] input'));
        this.inputFields.map((inputField: InputField) => {
            inputField.elem = itemContainer.element(by.css(inputField.getElementCss()));
        });
    }

    /**
     * Define all input fieldsAbstract methods to be implemented by subclasses
     */
    public abstract setupInputFields();
}
