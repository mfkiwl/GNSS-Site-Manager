import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class LocalEpisodicEffectGroup extends LogItemGroup {

    readonly eventInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="event"]'));

    public constructor() {
        super('Local Episodic Effect');
    }

    public getAllInputFields(): ElementFinder[] {
        return [
            this.eventInput,
        ];
    }
}
