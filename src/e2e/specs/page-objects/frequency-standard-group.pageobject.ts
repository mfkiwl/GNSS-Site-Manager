import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class FrequencyStandardGroup extends LogItemGroup {

    readonly standardTypeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="standardType"] input'));
    readonly inputFrequencyInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="inputFrequency"] input'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor() {
        super('Frequency Standard');
        this.inputElements = [
            this.standardTypeInput,
            this.inputFrequencyInput,
            this.notesInput,
        ];
    }
}
