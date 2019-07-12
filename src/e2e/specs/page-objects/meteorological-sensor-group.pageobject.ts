import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

/**
 *  This class represents one of meteorological sensors, such as Pressure, Humidity, Temperature, and Water Vapor sensors
 */
export class MeteorologicalSensorGroup extends LogItemGroup {

    readonly manufacturerInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="manufacturer"]'));
    readonly typeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="type"]'));
    readonly serialNumberInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="serialNumber"]'));
    readonly dataSamplingIntervalInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="dataSamplingInterval"]'));
    readonly accuracyHPaInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="accuracyHPa"]'));
    readonly accuracyPercentRelativeHumidityInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="accuracyPercentRelativeHumidity"]'));
    readonly accuracyDegreesCelciusInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="accuracyDegreesCelcius"]'));
    readonly heightDiffToAntennaInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="heightDiffToAntenna"]'));
    readonly aspirationInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="aspiration"]'));
    readonly calibrationDateInput: ElementFinder = this.newItemContainer
                    .element(by.css('datetime-input[controlName="calibrationDate"]'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"]'));

    public constructor(sensorName: string) {
        super(sensorName);
    }

    public getAllInputFields(): ElementFinder[] {
        let inputFields: ElementFinder[] = [
            this.manufacturerInput,
            this.typeInput,
            this.serialNumberInput,
            this.heightDiffToAntennaInput,
            this.calibrationDateInput,
            this.notesInput,
        ];

        if (this.itemName === 'Humidity Sensor') {
            inputFields.push(this.accuracyPercentRelativeHumidityInput);
            inputFields.push(this.aspirationInput);
        } else if(this.itemName === 'Pressure Sensor') {
            inputFields.push(this.accuracyHPaInput);
        } else if (this.itemName === 'Temperature Sensor') {
            inputFields.push(this.accuracyDegreesCelciusInput);
            inputFields.push(this.aspirationInput);
        }

        if (this.itemName !== 'Water Vapor Sensor') {
            inputFields.push(this.dataSamplingIntervalInput);
        }

        return inputFields;
    }
}
