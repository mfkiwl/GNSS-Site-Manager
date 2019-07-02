import { InputField, LogItemGroup } from './log-item-group.pageobject';

export class FrequencyStandardGroup extends LogItemGroup {

    public constructor() {
        super('Frequency Standard');
    }

    public setupInputFields() {
        this.inputFields = [
            new InputField('standardType', 'text'),
            new InputField('inputFrequency', 'number'),
            new InputField('notes', 'textarea'),
        ];
    }
}
