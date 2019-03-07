import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { GnssAntennaViewModel } from './gnss-antenna-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a single item of GNSS Antennas.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-antenna-item',
    templateUrl: 'gnss-antenna-item.component.html',
})
export class GnssAntennaItemComponent extends AbstractItemComponent {
    /**
     * The GNSS Antenna in question.
     */
    @Input() antenna: GnssAntennaViewModel;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'GNSS Antenna';
    }

    getItem(): AbstractViewModel {
        return this.antenna;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [{value: null, disabled: this.isEditable}],
            antennaType: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            serialNumber: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            startDate: [{value: '', disabled: this.isEditable}],
            endDate: [{value: '', disabled: this.isEditable}],
            antennaReferencePoint: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            markerArpEastEcc: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            markerArpUpEcc: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            markerArpNorthEcc: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            alignmentFromTrueNorth: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            antennaRadomeType: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            radomeSerialNumber: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            antennaCableType: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            antennaCableLength: [{value: '', disabled: this.isEditable}, [Validators.maxLength(25)]],
            notes: [{value: '', disabled: this.isEditable}, [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }
}
