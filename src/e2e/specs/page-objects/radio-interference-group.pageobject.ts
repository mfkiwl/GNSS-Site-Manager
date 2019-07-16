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
    }

    public getAllInputFields(): ElementFinder[] {
        return [
            this.possibleProblemSourceInput,
            this.observedDegradationInput,
            this.notesInput,
        ];
    }
}
