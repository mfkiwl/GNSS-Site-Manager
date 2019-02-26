import { Component, ChangeDetectorRef, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CorsSiteService, CorsNetworkService, MiscUtils } from '../shared/index';
import { SiteAdministrationModel } from './site-administration-model';
import { RadioButtonOption } from '../shared/form-input/radiobuttons-input.component';

/**
* This class represents the SiteAdministrationComponent for viewing and editing the details of
* siteAdministration (including siteStatus and corsNetworks) for super users only.
*/
@Component({
    moduleId: module.id,
    selector: 'gnss-site-administration',
    templateUrl: 'site-administration.component.html',
})
export class SiteAdministrationComponent implements OnInit, OnDestroy {
    public sitePermissionList: RadioButtonOption[] = [
        {
            label: 'Open Data',
            value: 'PUBLIC',
            tips: 'Access to data from these stations is open to anyone for access, use or sharing.'
        },
        {
            label: 'Closed Data',
            value: 'PRIVATE',
            tips: 'Access to data from these stations is restricted to APREF analysis centres'
                    + ' and use within AUSPOS. The data cannot be shared.'
        },
    ];

    @Input() parentForm: FormGroup;
    @Input() siteAdminModel: SiteAdministrationModel;

    public siteAdministrationForm: FormGroup;
    public miscUtils: any = MiscUtils;
    public isFormOpen: boolean = false;

    private subscription: Subscription;

    /**
    * Creates an instance of the SiteAdministration Component.
    */
    constructor(private formBuilder: FormBuilder,
                private corsSiteService: CorsSiteService,
                private corsNetworkService: CorsNetworkService,
                private changeDetectionRef: ChangeDetectorRef) {
    }

    /**
     * Initialise all data on loading the site-log page
     */
    public ngOnInit() {
        this.setupForm();
    }

     ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

     public getControlName(): string {
        return 'siteAdministration';
    }

    public isFormDirty(): boolean {
        return this.siteAdministrationForm && this.siteAdministrationForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteAdministrationForm.invalid;
    }

    private setupForm() {
        this.siteAdministrationForm = this.formBuilder.group({
            siteStatus: ['', [Validators.maxLength(10)]],
        });

        this.siteAdministrationForm.controls['siteStatus'].setValue(this.siteAdminModel.siteStatus);
        this.subscription = this.corsSiteService.isSuperuser.subscribe(superuser => {
            if (superuser) {
                this.siteAdministrationForm.enable();
            } else {
                this.siteAdministrationForm.disable();
            }
        });

        this.parentForm.addControl('siteAdministration', this.siteAdministrationForm);
    }
}
