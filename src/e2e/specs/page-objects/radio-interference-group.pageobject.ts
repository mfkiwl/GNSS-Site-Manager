import { InputField, LogItemGroup } from './log-item-group.pageobject';

export class RadioInterferenceGroup extends LogItemGroup {

    public constructor() {
        super('Radio Interference');
    }

    public setupInputFields() {
        this.inputFields = [
            new InputField('possibleProblemSource', 'text'),
            new InputField('observedDegradation', 'text'),
            new InputField('notes', 'textarea'),
        ];
    }
}
