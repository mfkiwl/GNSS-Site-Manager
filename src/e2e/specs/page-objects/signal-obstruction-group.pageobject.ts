import { InputField, LogItemGroup } from './log-item-group.pageobject';

export class SignalObstructionGroup extends LogItemGroup {

    public constructor() {
        super('Signal Obstruction');
    }

    public setupInputFields() {
        this.inputFields = [
            new InputField('possibleProblemSource', 'text'),
            new InputField('notes', 'textarea'),
        ];
    }
}
