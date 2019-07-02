import { InputField, LogItemGroup } from './log-item-group.pageobject';

/**
 *  This class represents one of meteorological sensors, such as Pressure, Humidity, Temperature, and Water Vapor sensors
 */
export class MeteorologicalSensorGroup extends LogItemGroup {

    public constructor(sensorName: string) {
        super(sensorName);
    }

    public setupInputFields() {
        this.inputFields = [
            new InputField('manufacturer', 'text'),
            new InputField('type', 'text'),
            new InputField('serialNumber', 'text'),
            new InputField('heightDiffToAntenna', 'number'),
            new InputField('calibrationDate', 'datetime'),
            new InputField('notes', 'textarea'),
        ];

        if (this.itemName === 'Humidity Sensor') {
            this.inputFields.push(new InputField('accuracyPercentRelativeHumidity', 'number'));
            this.inputFields.push(new InputField('aspiration', 'text'));
        } else if(this.itemName === 'Pressure Sensor') {
            this.inputFields.push(new InputField('accuracyHPa', 'number'));
        } else if (this.itemName === 'Temperature Sensor') {
            this.inputFields.push(new InputField('accuracyDegreesCelcius', 'number'));
            this.inputFields.push(new InputField('aspiration', 'text'));
        }

        if (this.itemName !== 'Water Vapor Sensor') {
            this.inputFields.push(new InputField('dataSamplingInterval', 'number'));
        }
    }
}
