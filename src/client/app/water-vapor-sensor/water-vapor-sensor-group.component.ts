import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
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
