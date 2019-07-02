import { InputField, LogItemGroup } from './log-item-group.pageobject';

export class MultipathSourceGroup extends LogItemGroup {

    public constructor() {
        super('Multipath Source');
    }

    public setupInputFields() {
        this.inputFields = [
            new InputField('possibleProblemSource', 'text'),
            new InputField('notes', 'textarea'),
        ];
    }
}
