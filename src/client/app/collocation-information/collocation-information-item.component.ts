import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';
import { CollocationInformationViewModel } from './collocation-information-view-model';

/**
 * This component represents a single collocation information log item.
 */
@Component({
    moduleId: module.id,
    selector: 'collocation-information-item',
    templateUrl: 'collocation-information-item.component.html',
})
export class CollocationInformationItemComponent extends AbstractItemComponent {

    @Input() collocationInformation: CollocationInformationViewModel;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Collocation Information';
    }

    getItem(): AbstractViewModel {
        return this.collocationInformation;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [{value: null, disabled: this.isEditable}],
            instrumentationType: [{value: '', disabled: this.isEditable}, [Validators.required]],
            status: [{value: '', disabled: this.isEditable}, [Validators.maxLength(2000)]],
            startDate: [{value: '', disabled: this.isEditable}],
            endDate: [{value: '', disabled: this.isEditable}],
            notes: [{value: '', disabled: this.isEditable}, [Validators.maxLength(2000)]],
        });
    }
}
