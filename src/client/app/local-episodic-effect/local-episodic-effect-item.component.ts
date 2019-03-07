import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { LocalEpisodicEffectViewModel } from './local-episodic-effect-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single Local Episodic Effect.
 */
@Component({
    moduleId: module.id,
    selector: 'local-episodic-effect-item',
    templateUrl: 'local-episodic-effect-item.component.html',
})
export class LocalEpisodicEffectItemComponent extends AbstractItemComponent {
    /**
     * The LocalEpisodicEffect in question.
     */
    @Input() localEpisodicEffect: LocalEpisodicEffectViewModel;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }

    getItem(): AbstractViewModel {
        return this.localEpisodicEffect;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [{value: null, disabled: this.isEditable}],
            event: [{value: '', disabled: this.isEditable}, [Validators.required]],
            startDate: [{value: '', disabled: this.isEditable}],
            endDate: [{value: '', disabled: this.isEditable}],
            objectMap: [''],
        });
    }
}
