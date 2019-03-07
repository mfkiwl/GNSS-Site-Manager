import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MiscUtils } from '../shared/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteLogViewModel }  from '../site-log/site-log-view-model';
import { SiteIdentificationViewModel } from './site-identification-view-model';
import { AbstractBaseComponent } from '../shared/abstract-groups-items/abstract-base.component';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents the SiteIdentification sub-component under the SiteInformation Component.
 *
 * Main fields of Site Identification (from https://igscb.jpl.nasa.gov/igscb/station/general/blank.log):
 * -----------------------------------------------------------------------------------------------------
 *      Site Name                :
 *      Four Character ID        : (A4)
 *      Monument Inscription     :
 *      IERS DOMES Number        : (A9)
 *      CDP Number               : (A4)
 *      Monument Description     : (PILLAR/BRASS PLATE/STEEL MAST/etc)
 *        Height of the Monument : (m)
 *        Monument Foundation    : (STEEL RODS, CONCRETE BLOCK, ROOF, etc)
 *        Foundation Depth       : (m)
 *      Marker Description       : (CHISELLED CROSS/DIVOT/BRASS NAIL/etc)
 *      Date Installed           : (CCYY-MM-DDThh:mmZ)
 *      Geologic Characteristic  : (BEDROCK/CLAY/CONGLOMERATE/GRAVEL/SAND/etc)
 *        Bedrock Type           : (IGNEOUS/METAMORPHIC/SEDIMENTARY)
 *        Bedrock Condition      : (FRESH/JOINTED/WEATHERED)
 *        Fracture Spacing       : (1-10 cm/11-50 cm/51-200 cm/over 200 cm)
 *        Fault zones nearby     : (YES/NO/Name of the zone)
 *          Distance/activity    : (multiple lines)
 *      Additional Information   : (multiple lines)
 * -----------------------------------------------------------------------------------------------------------
 */
@Component({
    moduleId: module.id,
    selector: 'site-identification',
    templateUrl: 'site-identification.component.html'
})
export class SiteIdentificationComponent extends AbstractBaseComponent implements OnInit, OnDestroy {

    public isOpen: boolean = false;
    public miscUtils: any = MiscUtils;
    public siteIdentificationForm: FormGroup;
    public siteIdentification: SiteIdentificationViewModel;

    @Input() parentForm: FormGroup;
    @Input() siteLogModel: SiteLogViewModel;

    private subscription: Subscription;

    constructor(private siteLogService: SiteLogService,
                private formBuilder: FormBuilder,
                private changeDetectionRef: ChangeDetectorRef) {
        super(siteLogService);
    }

    ngOnInit() {
        this.setupForm();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subscription.unsubscribe();
    }

    public getItemName(): string {
        return 'Site Identification';
    }

    public getControlName(): string {
        return 'siteIdentification';
    }

    public isFormDirty(): boolean {
        return this.siteIdentificationForm && this.siteIdentificationForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteIdentificationForm && this.siteIdentificationForm.invalid;
    }

    /**
     * Gets a value for the fourCharacterID field's readonly attribute
     * based on whether the user is editing a site or is making a new site.
     */
    public getFourCharacterIdReadOnlyAttribute(): string {
        return this.siteIdentification && this.siteIdentification.fourCharacterID ? 'readonly' : null;
    }

    private setupForm() {
        this.siteIdentificationForm = this.formBuilder.group({
            siteName: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            fourCharacterID: [{value: '', disabled: this.isEditable}, [Validators.minLength(4), Validators.maxLength(25)]],
            monumentInscription: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            iersDOMESNumber: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            cdpNumber: [{value: '', disabled: this.isEditable}, [Validators.maxLength(25)]],
            monumentDescription: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            heightOfTheMonument: {value: '', disabled: this.isEditable},
            monumentFoundation: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            foundationDepth: {value: '', disabled: this.isEditable},
            markerDescription: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            dateInstalled: [{value: '', disabled: this.isEditable}],
            geologicCharacteristic: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            bedrockType: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            bedrockCondition: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            fractureSpacing: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            faultZonesNearby: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            distanceActivity: [{value: '', disabled: this.isEditable}, [Validators.maxLength(50)]],
            notes: [{value: '', disabled: this.isEditable}, [Validators.maxLength(2000)]],
            objectMap: [''],
        });
        this.siteIdentification = this.siteLogModel.siteInformation.siteIdentification;
        this.siteIdentificationForm.patchValue(this.siteIdentification);
        this.subscription = this.siteLogService.isUserAuthorisedToEditSite.subscribe(authorised => {
            if (authorised) {
                this.siteIdentificationForm.enable();
            } else {
                this.siteIdentificationForm.disable();
            }
        });
        this.parentForm.addControl('siteIdentification', this.siteIdentificationForm);
    }
}
