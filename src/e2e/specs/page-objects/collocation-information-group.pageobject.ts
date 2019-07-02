import { InputField, LogItemGroup } from './log-item-group.pageobject';

export class CollocationInformationGroup extends LogItemGroup {

    public constructor() {
        super('Collocation Information');
    }

    public getGroupName(): string {
        return this.itemName;
    }

    public setupInputFields() {
        this.inputFields = [
            new InputField('instrumentationType', 'text'),
            new InputField('status', 'text'),
            new InputField('notes', 'textarea'),
        ];
    }
}
