import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class GnssAntennaGroup extends LogItemGroup {

    readonly antennaTypeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="antennaType"] input'));
    readonly serialNumberInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="serialNumber"] input'));
    readonly antennaReferencePointInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="antennaReferencePoint"] input'));
    readonly markerArpEastEccInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="markerArpEastEcc"] input'));
    readonly markerArpUpEccInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="markerArpUpEcc"] input'));
    readonly markerArpNorthEccInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="markerArpNorthEcc"] input'));
    readonly alignmentFromTrueNorthInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="alignmentFromTrueNorth"] input'));
    readonly antennaRadomeTypeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="antennaRadomeType"] input'));
    readonly radomeSerialNumberInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="radomeSerialNumber"] input'));
    readonly antennaCableTypeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="antennaCableType"] input'));
    readonly antennaCableLengthInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="antennaCableLength"] input'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor() {
        super('GNSS Antenna');
        this.inputElements = [
            this.antennaTypeInput,
            this.serialNumberInput,
            this.antennaReferencePointInput,
            this.markerArpEastEccInput,
            this.markerArpUpEccInput,
            this.markerArpNorthEccInput,
            this.alignmentFromTrueNorthInput,
            this.antennaRadomeTypeInput,
            this.radomeSerialNumberInput,
            this.antennaCableTypeInput,
            this.antennaCableLengthInput,
            this.notesInput,
        ];
    }
}
