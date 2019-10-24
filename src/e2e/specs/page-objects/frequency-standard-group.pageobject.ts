import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class FrequencyStandardGroup extends LogItemGroup {

    readonly standardTypeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="standardType"]'));
    readonly inputFrequencyInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="inputFrequency"]'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"]'));

    public constructor() {
        super('Frequency Standard');
    }

    public getAllInputFields(): ElementFinder[] {
        return [
            this.standardTypeInput,
            this.inputFrequencyInput,
            this.notesInput,
        ];
    }
}
