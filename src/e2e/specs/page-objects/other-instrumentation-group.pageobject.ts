import { InputField, LogItemGroup } from './log-item-group.pageobject';

export class OtherInstrumentationGroup extends LogItemGroup {

    public constructor() {
        super('Other Instrumentation');
    }

    public getGroupName(): string {
        return this.itemName;
    }

    public setupInputFields() {
        this.inputFields = [
            new InputField('instrumentation', 'textarea'),
        ];
    }
}
