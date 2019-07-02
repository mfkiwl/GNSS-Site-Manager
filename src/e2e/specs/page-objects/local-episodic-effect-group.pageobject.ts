import { InputField, LogItemGroup } from './log-item-group.pageobject';

export class LocalEpisodicEffectGroup extends LogItemGroup {

    public constructor() {
        super('Local Episodic Effect');
    }

    public setupInputFields() {
        this.inputFields = [
            new InputField('event', 'textarea'),
        ];
    }
}
