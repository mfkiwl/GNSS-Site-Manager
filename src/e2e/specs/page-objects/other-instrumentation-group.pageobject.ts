import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class OtherInstrumentationGroup extends LogItemGroup {

    readonly instrumentationInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="instrumentation"]'));

    public constructor() {
        super('Other Instrumentation');
    }

    public getGroupName(): string {
        return this.itemName;
    }

    public getAllInputFields(): ElementFinder[] {
        return [
            this.instrumentationInput,
        ];
    }
}
