import { Component } from '@angular/core';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { WaterVaporSensorViewModel } from './water-vapor-sensor-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a group of WaterVapor Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'water-vapor-sensor-group',
    templateUrl: 'water-vapor-sensor-group.component.html',
})
export class WaterVaporSensorGroupComponent extends AbstractGroupComponent<WaterVaporSensorViewModel> {

    constructor(protected siteLogService: SiteLogService) {
        super(siteLogService);
    }

    getItemName(): string {
        return 'Water Vapor Sensor';
    }

    getControlName(): string {
        return 'waterVaporSensors';
    }

    getNewItemViewModel(): WaterVaporSensorViewModel {
        return new WaterVaporSensorViewModel();
    }
}
