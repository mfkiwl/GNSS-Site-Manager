import * as _ from 'lodash';
import { TestUtils } from '../utils/test.utils';
import { ResponsiblePartyViewModel } from '../../../client/app/responsible-party/responsible-party-view-model';
import { PressureSensorViewModel } from '../../../client/app/pressure-sensor/pressure-sensor-view-model';
import { HumiditySensorViewModel } from '../../../client/app/humidity-sensor/humidity-sensor-view-model';
import { TemperatureSensorViewModel } from '../../../client/app/temperature-sensor/temperature-sensor-view-model';
import { WaterVaporSensorViewModel } from '../../../client/app/water-vapor-sensor/water-vapor-sensor-view-model';

const timestamp: string = TestUtils.getTimeStamp();

export const mockResponsibleParty: ResponsiblePartyViewModel = {
    individualName: 'Landgate',
    organisationName: 'WA Landgate ' + timestamp,
    positionName: 'Manager',
    deliveryPoint: '1 Midland Square, Midland WA 6056, AUSTRALIA',
    city: 'Midland',
    administrativeArea: 'WA',
    postalCode: '6056',
    country: 'Australia',
    email: 'geodesy@landgate.wa.gov.au',
    primaryPhone: '+61 8 92739997',
    secondaryPhone: '+61 8 92739998',
    fax: '+61 8 92739999',
    url: 'http://www.landgate.wa.gov.au',

    id: null,
    startDate: null,
    endDate: null,
    dateInserted: null,
    dateDeleted: null,
    deletedReason: null,
    isDeleted: false
};

export const meteorologicalSensorCommonProperties: any = {
    manufacturer: 'Vaisala',
    type: 'PTB110',
    serialNumber: 'P1110001',
    heightDiffToAntenna: 10,
    calibrationDate: '2017-08-08 10:20:30',
    notes: 'e2e testing - add a new item ' + timestamp
};

export const mockPressureSensor: PressureSensorViewModel = <PressureSensorViewModel>_.extend(meteorologicalSensorCommonProperties,
        { dataSamplingInterval: 600, accuracyHPa: 0.3 });
export const mockHumiditySensor: HumiditySensorViewModel = <HumiditySensorViewModel>_.extend(meteorologicalSensorCommonProperties,
        { dataSamplingInterval: 600, accuracyPercentRelativeHumidity: 0, aspiration: 'Natural' });
export const mockTemperatureSensor: TemperatureSensorViewModel = <TemperatureSensorViewModel>_.extend(meteorologicalSensorCommonProperties,
        { dataSamplingInterval: 600, accuracyDegreesCelcius: 0, aspiration: 'Natural' });
export const mockWaterVaporSensor: WaterVaporSensorViewModel = <WaterVaporSensorViewModel>meteorologicalSensorCommonProperties;
