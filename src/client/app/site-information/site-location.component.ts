import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MiscUtils } from '../shared/global/misc-utils';
import { DialogService } from '../shared/index';
import { SiteLogService, ApplicationState, ApplicationSaveState } from '../shared/site-log/site-log.service';
import { AbstractBaseComponent } from '../shared/abstract-groups-items/abstract-base.component';
import { SiteLogViewModel }  from '../site-log/site-log-view-model';
import { SiteLocationViewModel } from './site-location-view-model';
import * as _ from 'lodash';

/**
 * This class represents the SiteLocation sub-component under the SiteInformation Component.
 *
 * Main fields of Site Location (from https://igscb.jpl.nasa.gov/igscb/station/general/blank.log):
 *     City or Town             :
 *     State or Province        :
 *     Country                  :
 *     Tectonic Plate           :
 *     Approximate Position (ITRF)
 *       X coordinate (m)       :
 *       Y coordinate (m)       :
 *       Z coordinate (m)       :
 *       Latitude (N is +)      : (+/-DDMMSS.SS)
 *       Longitude (E is +)     : (+/-DDDMMSS.SS)
 *       Elevation (m,ellips.)  : (F7.1)
 *     Additional Information   : (multiple lines)
 *
 */
@Component({
    moduleId: module.id,
    selector: 'site-location',
    templateUrl: 'site-location.component.html'
})
export class SiteLocationComponent extends AbstractBaseComponent implements OnInit, OnDestroy {

    public miscUtils: any = MiscUtils;
    public isOpen: boolean = false;
    public isNew: boolean = false;
    public isDeleted: boolean = false;
    public isCartesianPositionRequired: boolean = false;
    public isGeodeticPositionRequired: boolean = false;

    @Input() parentForm: FormGroup;
    @Input() siteLogModel: SiteLogViewModel;

    cartesianPositionForm: FormGroup;
    geodeticPositionForm: FormGroup;
    private siteLocationForm: FormGroup;
    private siteLocation: SiteLocationViewModel;
    private cartesianPositionFormValidators: ValidatorFn[];
    private geodeticPositionFormValidators: ValidatorFn[];
    private stateSubscription: Subscription;
    private cartesianSubscription: Subscription;
    private geodeticSubscription: Subscription;

    constructor(protected siteLogService: SiteLogService,
                protected dialogService: DialogService,
                protected formBuilder: FormBuilder) {
        super(siteLogService);
    }

    ngOnInit() {
        this.setupForm();
        this.stateSubscription = this.siteLogService.getApplicationState().subscribe((applicationState: ApplicationState) => {
            if (applicationState.applicationSaveState === ApplicationSaveState.saved) {
                this.isNew = false;
                this.isDeleted = false;
            }
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.stateSubscription.unsubscribe();
        this.cartesianSubscription.unsubscribe();
        this.geodeticSubscription.unsubscribe();
    }

    getItemName(): string {
        return 'Site Location';
    }

    getControlName(): string {
        return 'siteLocation';
    }

    public isFormDirty(): boolean {
        return this.siteLocationForm && this.siteLocationForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteLocationForm && this.siteLocationForm.invalid;
    }


    public isDeleteDisabled(): boolean {
        if (this.isNew) {
            return false;
        }
        return !this.isEditable || this.isDeleted;
    }

    public getRemoveOrDeletedText(): string {
        return this.isNew ? 'Cancel' : 'Delete';
    }

    public addNew(event: UIEvent): void {
        event.preventDefault();
        this.isNew = true;
        this.isOpen = true;
        this.siteLocation = new SiteLocationViewModel();
        setTimeout(() => {
            if (this.siteLocationForm) {
                this.siteLocationForm.markAsDirty();
            }
        });
    }

    /**
     * Remove an item from the UI and delete if it is an existing record.
     */
    public removeItem(): boolean {

        if (this.isNew) {
            this.cancelNew();
        } else {
            this.dialogService.confirmDeleteDialog(
                this.getItemName(),
                (deleteReason : string) => {  // ok callback
                    this.deleteItem(deleteReason);
                },
                () => {  // cancel callback
                    console.log('delete cancelled by user');
                }
            );
        }
        return false;
    }

    public cancelNew() {
        this.siteLocation = null;
        this.isNew = false;
        if (this.siteLocationForm) {
            this.siteLocationForm.markAsPristine();
            this.parentForm.removeControl(this.getControlName());
        }
    }

    /**
     *  Mark an item for deletion with the given reason.
     */
    private deleteItem(deleteReason : string | null): void {
        this.isDeleted = true;
        let date: string = MiscUtils.getUTCDateTime();
        this.siteLocation.dateDeleted = date;
        this.siteLocation.deletedReason = deleteReason;
        this.siteLocationForm.markAsDirty();
        this.siteLocationForm.disable();
    }

    private setupForm() {
        this.cartesianPositionForm = this.formBuilder.group({
            x: {value: '', disabled: this.isEditable},
            y: {value: '', disabled: this.isEditable},
            z: {value: '', disabled: this.isEditable}
        });
        // Validators are applied in handleLocationPositionGroupChange.
        // Validators.required is added to those listed (conditionally when the group has at least one value)
        this.cartesianPositionFormValidators = [];
        this.cartesianSubscription = this.cartesianPositionForm.valueChanges.subscribe(
            (change: any) => {
            this.isCartesianPositionRequired = this.handleLocationPositionGroupChange(change,
                                    this.cartesianPositionForm, this.cartesianPositionFormValidators);
            }
        );
        this.geodeticPositionForm = this.formBuilder.group({
            lat: {value: '', disabled: this.isEditable},
            lon: {value: '', disabled: this.isEditable},
            height: {value: '', disabled: this.isEditable}
        });
        // Validators are applied in handleLocationPositionGroupChange.
        // Validators.required is added to those listed (conditionally when the group has at least one value)
        this.geodeticPositionFormValidators = [];
        this.geodeticSubscription = this.geodeticPositionForm.valueChanges.subscribe(
            (change: any) => {
                this.isGeodeticPositionRequired = this.handleLocationPositionGroupChange(change,
                                    this.geodeticPositionForm, this.geodeticPositionFormValidators);
            }
        );
        this.siteLocationForm = this.formBuilder.group({
            city: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            state: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            countryCodeISO: [{value: '', disabled: this.isEditable}, [Validators.maxLength(10)]],
            cartesianPosition: this.cartesianPositionForm,
            geodeticPosition: this.geodeticPositionForm,
            tectonicPlate: [{value: '', disabled: this.isEditable}, [Validators.maxLength(100)]],
            notes: [{value: '', disabled: this.isEditable}, [Validators.maxLength(2000)]],
            objectMap: [''],
        });
        this.siteLocation = this.siteLogModel.siteInformation.siteLocation;
        this.siteLocationForm.patchValue(this.siteLocation);
        this.siteLogService.isUserAuthorisedToEditSite.subscribe(authorised => {
            if (authorised) {
                this.siteLocationForm.enable();
            } else {
                this.siteLocationForm.disable();
            }
        });
        this.parentForm.addControl('siteLocation', this.siteLocationForm);
    }

    /**
     * The groups we have here are all or nothing.  The validators.required is set on each field in Geodetic Position and
     * cartesian Position but when no fields have a value then the group is optional.
     *
     * @param groupItems - the group items values that come from an OnChange subscription
     * @param positionGroup - the FormGroup that holds the items
     * @returns {boolean} a flag indicating whether any fields have valid values
     */
    private handleLocationPositionGroupChange(groupItems: any, positionGroup: FormGroup, permanentValidators: ValidatorFn[]): boolean {
        let someFieldHasValue: boolean = false;
        Object.keys(groupItems).forEach((key) => {
            if (groupItems[key] != null) {
                someFieldHasValue = true;
            }
        });

        // If any group Item form field has a value then all are required
        Object.keys(groupItems).forEach((key) => {
            let itemControl: AbstractControl = positionGroup.controls[key];
            if (!itemControl) {
                throw new Error(`Control for group item: ${key} doesnt exist in positionGroup: ${positionGroup}`);
            }
            if (someFieldHasValue) {
                    itemControl.setValidators(_.concat(permanentValidators, Validators.required));
                    itemControl.updateValueAndValidity({emitEvent: false});
            } else {
                    itemControl.clearValidators();
                    itemControl.updateValueAndValidity({emitEvent: false});
            }
        });

        return someFieldHasValue;
    }
}
