import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class GnssReceiverGroup extends LogItemGroup {

    readonly receiverTypeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="receiverType"] input'));
    readonly manufacturerSerialNumberInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="manufacturerSerialNumber"] input'));
    readonly firmwareVersionInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="firmwareVersion"] input'));
    readonly elevationCutoffSettingInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="elevationCutoffSetting"] input'));
    readonly temperatureStabilizationInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="temperatureStabilization"] input'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor() {
        super('GNSS Receiver');
        this.inputElements = [
            this.receiverTypeInput,
            this.manufacturerSerialNumberInput,
            this.firmwareVersionInput,
            this.elevationCutoffSettingInput,
            this.temperatureStabilizationInput,
            this.notesInput,
        ];
    }
}
