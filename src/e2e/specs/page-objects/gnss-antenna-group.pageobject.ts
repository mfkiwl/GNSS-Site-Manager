import { InputField, LogItemGroup } from './log-item-group.pageobject';

export class GnssAntennaGroup extends LogItemGroup {

    public constructor() {
        super('GNSS Antenna');
    }

    public setupInputFields() {
        this.inputFields = [
            new InputField('antennaType', 'text'),
            new InputField('serialNumber', 'text'),
            new InputField('antennaReferencePoint', 'text'),
            new InputField('markerArpEastEcc', 'number'),
            new InputField('markerArpUpEcc', 'number'),
            new InputField('markerArpNorthEcc', 'number'),
            new InputField('alignmentFromTrueNorth', 'number'),
            new InputField('antennaRadomeType', 'text'),
            new InputField('radomeSerialNumber', 'text'),
            new InputField('antennaCableType', 'text'),
            new InputField('antennaCableLength', 'number'),
            new InputField('notes', 'textarea'),
        ];
    }
}
