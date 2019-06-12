import { Component } from '@angular/core';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { TemperatureSensorViewModel } from './temperature-sensor-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a group of Temperature Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'temperature-sensor-group',
    templateUrl: 'temperature-sensor-group.component.html',
})
export class TemperatureSensorGroupComponent extends AbstractGroupComponent<TemperatureSensorViewModel> {

    constructor(protected siteLogService: SiteLogService) {
        super(siteLogService);
    }

    getItemName(): string {
        return 'Temperature Sensor';
    }

    getControlName(): string {
        return 'temperatureSensors';
    }

    getNewItemViewModel(): TemperatureSensorViewModel {
        return new TemperatureSensorViewModel();
    }
}
