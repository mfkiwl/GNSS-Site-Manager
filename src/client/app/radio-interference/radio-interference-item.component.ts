import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';
import { RadioInterferenceViewModel } from './radio-interference-view-model';

/**
 * This component represents a single Pressure Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'radio-interference-item',
    templateUrl: 'radio-interference-item.component.html',
})
export class RadioInterferenceItemComponent extends AbstractItemComponent {
    /**
     * The RadioInterference in question.
     */
    @Input() radioInterference: RadioInterferenceViewModel;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Radio Interference';
    }

    getItem(): AbstractViewModel {
        return this.radioInterference;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [{value: null, disabled: this.isEditable}],
            observedDegradation: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            possibleProblemSource: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            startDate: [{value: '', disabled: this.isEditable}],
            endDate: [{value: '', disabled: this.isEditable}],
            notes: [{value: '', disabled: this.isEditable}, [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }
}
