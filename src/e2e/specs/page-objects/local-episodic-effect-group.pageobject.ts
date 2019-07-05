import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class LocalEpisodicEffectGroup extends LogItemGroup {

    readonly eventInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="event"]'));

    public constructor() {
        super('Local Episodic Effect');
        this.getInputElements();
    }

    public getInputElements() {
        this.inputElements = [
            this.eventInput,
        ];
    }
}
