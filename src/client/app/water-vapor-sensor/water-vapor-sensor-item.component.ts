import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { WaterVaporSensorViewModel } from './water-vapor-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single WaterVapor Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'water-vapor-sensor-item',
    templateUrl: 'water-vapor-sensor-item.component.html',
})
export class WaterVaporSensorItemComponent extends AbstractItemComponent {
    /**
     * The WaterVaporSensor in question.
     */
    @Input() waterVaporSensor: WaterVaporSensorViewModel;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Water Vapor Sensor';
    }

    getItem(): AbstractViewModel {
        return this.waterVaporSensor;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [{value: null, disabled: this.isEditable}],
            type: [{value: '', disabled: this.isEditable}, [Validators.required, Validators.maxLength(100)]],
            manufacturer: [{value: '', disabled: this.isEditable}, [Validators.required, Validators.maxLength(100)]],
            serialNumber: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            heightDiffToAntenna: [{value: '', disabled: this.isEditable}],
            calibrationDate: [{value: '', disabled: this.isEditable}],
            startDate: [{value: '', disabled: this.isEditable}],
            endDate: [{value: '', disabled: this.isEditable}],
            notes: [{value: '', disabled: this.isEditable}, [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }
}
