import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { TemperatureSensorViewModel } from './temperature-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single Temperature Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'temperature-sensor-item',
    templateUrl: 'temperature-sensor-item.component.html',
})
export class TemperatureSensorItemComponent extends AbstractItemComponent {
    /**
     * The TemperatureSensor in question.
     */
    @Input() temperatureSensor: TemperatureSensorViewModel;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Temperature Sensor';
    }

    getItem(): AbstractViewModel {
        return this.temperatureSensor;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [{value: null, disabled: this.isEditable}],
            type: [{value: '', disabled: this.isEditable}, [Validators.required, Validators.maxLength(100)]],
            manufacturer: [{value: ' ', disabled: this.isEditable}, [Validators.required, Validators.maxLength(100)]],
            serialNumber: [{value: ' ', disabled: this.isEditable}, [Validators.maxLength(100)]],
            dataSamplingInterval: [{value: '', disabled: this.isEditable}],
            accuracyDegreesCelcius: [{value: '', disabled: this.isEditable}],
            heightDiffToAntenna: [{value: '', disabled: this.isEditable}],
            aspiration: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            calibrationDate: [{value: '', disabled: this.isEditable}],
            startDate: [{value: '', disabled: this.isEditable}],
            endDate: [{value: '', disabled: this.isEditable}],
            notes: [{value: '', disabled: this.isEditable}, [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }
}
