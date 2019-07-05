import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class OtherInstrumentationGroup extends LogItemGroup {

    readonly instrumentationInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="instrumentation"]'));

    public constructor() {
        super('Other Instrumentation');
        this.getInputElements();
    }

    public getGroupName(): string {
        return this.itemName;
    }

    public getInputElements() {
        this.inputElements = [
            this.instrumentationInput,
        ];
    }
}
