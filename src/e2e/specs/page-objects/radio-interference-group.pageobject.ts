import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class RadioInterferenceGroup extends LogItemGroup {

    readonly possibleProblemSourceInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="possibleProblemSource"]'));
    readonly observedDegradationInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="observedDegradation"]'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"]'));

    public constructor() {
        super('Radio Interference');
        this.getInputElements();
    }

    public getInputElements() {
        this.inputElements = [
            this.possibleProblemSourceInput,
            this.observedDegradationInput,
            this.notesInput,
        ];
    }
}
