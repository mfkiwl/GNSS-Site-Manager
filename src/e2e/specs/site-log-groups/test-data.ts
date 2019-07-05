import { TestUtils } from '../utils/test.utils';


const timestamp: string = TestUtils.getTimeStamp();

/**
 * Test data for five Responsible Parties, including Site Owner, Contacts, Metadata Custodian,  Data Centers and Data Source.
 */
export const responsiblePartyTestData = {
    individualName: 'Homer Simpson',
    organisationName: 'Geoscience Australia',
    positionName: 'Manager ' + timestamp,
    deliveryPoint: 'Cnr Jerrabomberra Ave and Hindmarsh Drive, Symonston, ACT',
    city: 'Symonston',
    administrativeArea: 'ACT',
    postalCode: '2609',
    country: 'Australia',
    email: 'Homer.Simpson@ga.gov.au',
    primaryPhone: '0262499997',
    secondaryPhone: '0262499998',
    fax: '0262499999',
};

/**
 * Test data for all site-log instrument components in the order same as in web UI
 */
export const siteLogTestData = {
    gnssReceiver: {
        receiverType: 'ASHTECH Z-XII3',
        manufacturerSerialNumber: '8888',
        satelliteSystems: ['GPS', 'GLO'],
        firmwareVersion: '8Y08-8D08',
        elevationCutoffSetting: 5,
        temperatureStabilization: 10,
        notes: 'e2e testing - add a new item ' + timestamp,
    },
    gnssAntenna: {
        antennaType: 'ASH700936B_L',
        serialNumber: '1616',
        antennaReferencePoint: 'BBPPAA',
        markerArpEastEcc: 1,
        markerArpUpEcc: 2,
        markerArpNorthEcc: 3,
        alignmentFromTrueNorth: 0,
        antennaRadomeType: 'SNOW_1',
        radomeSerialNumber: 'SNOW_Test',
        antennaCableType: 'SNOW_2',
        antennaCableLength: 100,
        notes: 'e2e testing - add a new item ' + timestamp,
    },
    surveyedLocalTie: {
        tiedMarkerName: 'UNK-Test',
        tiedMarkerUsage: 'FOOTPRINT',
        tiedMarkerCDPNumber: 'A14',
        tiedMarkerDOMESNumber: 'A19',
        dx: 2,
        dy: 3,
        dz: 4,
        localSiteTiesAccuracy: '0',
        surveyMethod: 'TRIANGULATION',
        notes: 'e2e testing - add a new item ' + timestamp,
    },
    frequencyStandard: {
        standardType: 'Cesium - Rcvr 3',
        inputFrequency: 1080,
        notes: 'e2e testing - add a new item ' + timestamp,
    },
    collocationInformation: {
        instrumentationType: 'Unknown',
        status: 'OK',
        notes: 'e2e testing - add a new item ' + timestamp,
    },
    localEpisodicEffect: {
        event: 'e2e testing ' + timestamp,
    },
    humiditySensor: {
        type: 'PTB110',
        serialNumber: 'P1110001',
        heightDiffToAntenna: 10,
        dataSamplingInterval: 600,
        accuracyPercentRelativeHumidity: 0,
        aspiration: 'Natural',
        manufacturer: 'Vaisala',
        calibrationDate: '2017-08-08 10:20:30',
        notes: 'e2e testing - add a new item ' + timestamp,
    },
    pressureSensor: {
        type: 'PTB110',
        serialNumber: 'P1110001',
        heightDiffToAntenna: 10,
        dataSamplingInterval: 600,
        accuracyHPa: 0.3,
        manufacturer: 'Vaisala',
        calibrationDate: '2017-08-08 10:20:30',
        notes: 'e2e testing - add a new item ' + timestamp,
    },
    temperatureSensor: {
        type: 'PTB110',
        serialNumber: 'P1110001',
        heightDiffToAntenna: 10,
        dataSamplingInterval: 600,
        accuracyDegreesCelcius: 0,
        aspiration: 'Natural',
        manufacturer: 'Vaisala',
        calibrationDate: '2017-08-08 10:20:30',
        notes: 'e2e testing - add a new item ' + timestamp,
    },
    waterVaporSensor: {
        type: 'PTB110',
        serialNumber: 'P1110001',
        heightDiffToAntenna: 10,
        manufacturer: 'Vaisala',
        calibrationDate: '2017-08-08 10:20:30',
        notes: 'e2e testing - add a new item ' + timestamp,
    },
    otherInstrumentation: {
        instrumentation: 'e2e testing ' + timestamp,
    },
    radioInterference: {
        possibleProblemSource: 'External source',
        observedDegradation: 'Unknown',
        notes: 'e2e testing - add a new item ' + timestamp,
    },
    signalObstruction: {
        possibleProblemSource: 'External source',
        notes: 'e2e testing - add a new item ' + timestamp,
    },
    multipathSource: {
        possibleProblemSource: 'External source',
        notes: 'e2e testing - add a new item ' + timestamp,
    },
};
