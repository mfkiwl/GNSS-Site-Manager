import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class CollocationInformationGroup extends LogItemGroup {

    readonly instrumentationTypeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="instrumentationType"]'));
    readonly statusInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="status"]'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"]'));

    public constructor() {
        super('Collocation Information');
    }

    public getGroupName(): string {
        return this.itemName;
    }

    public getAllInputFields(): ElementFinder[] {
        return [
            this.instrumentationTypeInput,
            this.statusInput,
            this.notesInput
        ];
    }
}
