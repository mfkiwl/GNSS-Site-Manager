import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

/**
 *  This class represents one of meteorological sensors, such as Pressure, Humidity, Temperature, and Water Vapor sensors
 */
export class MeteorologicalSensorGroup extends LogItemGroup {

    readonly manufacturerInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="manufacturer"] input'));
    readonly typeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="type"] input'));
    readonly serialNumberInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="serialNumber"] input'));
    readonly dataSamplingIntervalInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="dataSamplingInterval"] input'));
    readonly accuracyHPaInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="accuracyHPa"] input'));
    // TODO: rename controlName "accuracyPercentRelativeHumidity" to a shorter string name as the max length of
    // controlNname returned by ElementFinder.getAttribute('ng-reflect-name') is 30 chars, the rest are truncated
    //readonly accuracyPercentRelativeHumidityInput: ElementFinder = this.currentItemContainer
    //                .element(by.css('number-input[controlName="accuracyPercentRelativeHumidity"] input'));
    readonly accuracyDegreesCelciusInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="accuracyDegreesCelcius"] input'));
    readonly heightDiffToAntennaInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="heightDiffToAntenna"] input'));
    readonly aspirationInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="aspiration"] input'));
    readonly calibrationDateInput: ElementFinder = this.currentItemContainer
                    .element(by.css('datetime-input[controlName="calibrationDate"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor(sensorName: string) {
        super(sensorName);
        this.inputElements = [
            this.manufacturerInput,
            this.typeInput,
            this.serialNumberInput,
            this.heightDiffToAntennaInput,
            this.calibrationDateInput,
            this.notesInput,
        ];

        if (this.itemName === 'Humidity Sensor') {
            //this.inputElements.push(this.accuracyPercentRelativeHumidityInput);
            this.inputElements.push(this.aspirationInput);
        } else if(this.itemName === 'Pressure Sensor') {
            this.inputElements.push(this.accuracyHPaInput);
        } else if (this.itemName === 'Temperature Sensor') {
            this.inputElements.push(this.accuracyDegreesCelciusInput);
            this.inputElements.push(this.aspirationInput);
        }

        if (this.itemName !== 'Water Vapor Sensor') {
            this.inputElements.push(this.dataSamplingIntervalInput);
        }
    }
}
