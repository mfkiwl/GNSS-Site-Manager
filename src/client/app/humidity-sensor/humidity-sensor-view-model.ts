import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { ObjectMap } from '../shared/json-data-view-model/data-view-translator';

export class HumiditySensorViewModel extends AbstractViewModel {
    public calibrationDate: string = null;
    public dataSamplingInterval: number = null;
    public accuracyPercentRelativeHumidity: number = null;
    public aspiration: string = null;
    public notes: string = null;
    public manufacturer: string = null;
    public serialNumber: string = null;
    public heightDiffToAntenna: number = null;

    constructor() {
        super();
    }

    public getObjectMap(): ObjectMap {
        throw new Error('Not supported');
    }

    createFieldMappings(): void {
    };
}
