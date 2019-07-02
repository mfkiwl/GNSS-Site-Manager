import { InputField, LogItemGroup } from './log-item-group.pageobject';

export class GnssReceiverGroup extends LogItemGroup {

    public constructor() {
        super('GNSS Receiver');
    }

    public setupInputFields() {
        this.inputFields = [
            new InputField('receiverType', 'text'),
            new InputField('manufacturerSerialNumber', 'text'),
            new InputField('firmwareVersion', 'text'),
            new InputField('elevationCutoffSetting', 'number'),
            new InputField('temperatureStabilization', 'number'),
            new InputField('notes', 'textarea'),
        ];
    }
}
