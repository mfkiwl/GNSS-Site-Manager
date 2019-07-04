import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class CollocationInformationGroup extends LogItemGroup {

    readonly instrumentationTypeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="instrumentationType"] input'));
    readonly statusInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="status"] input'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor() {
        super('Collocation Information');
        this.inputElements = [
            this.instrumentationTypeInput,
            this.statusInput,
            this.notesInput
        ];
    }

    public getGroupName(): string {
        return this.itemName;
    }
}
