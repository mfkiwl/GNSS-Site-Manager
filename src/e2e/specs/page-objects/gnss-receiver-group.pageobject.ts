import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class GnssReceiverGroup extends LogItemGroup {

    readonly receiverTypeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="receiverType"]'));
    readonly manufacturerSerialNumberInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="manufacturerSerialNumber"]'));
    readonly firmwareVersionInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="firmwareVersion"]'));
    readonly elevationCutoffSettingInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="elevationCutoffSetting"]'));
    readonly temperatureStabilizationInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="temperatureStabilization"]'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"]'));

    public constructor() {
        super('GNSS Receiver');
        this.getInputElements();
    }

    public getInputElements() {
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
