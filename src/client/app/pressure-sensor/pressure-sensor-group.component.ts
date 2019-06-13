import { Component } from '@angular/core';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { PressureSensorViewModel } from './pressure-sensor-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'pressure-sensor-group',
    templateUrl: 'pressure-sensor-group.component.html',
})
export class PressureSensorGroupComponent extends AbstractGroupComponent<PressureSensorViewModel> {

    constructor(protected siteLogService: SiteLogService) {
        super(siteLogService);
    }

    getItemName(): string {
        return 'Pressure Sensor';
    }

    getControlName(): string {
        return 'pressureSensors';
    }

    getNewItemViewModel(): PressureSensorViewModel {
        return new PressureSensorViewModel();
    }
}
