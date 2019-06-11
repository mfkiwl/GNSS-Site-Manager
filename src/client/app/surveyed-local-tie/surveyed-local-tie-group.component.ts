import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { SurveyedLocalTieViewModel } from './surveyed-local-tie-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**.
 * This class represents a group of Surveyed Local Ties.
 */
@Component({
    moduleId: module.id,
    selector: 'surveyed-local-tie-group',
    templateUrl: 'surveyed-local-tie-group.component.html',
})
export class SurveyedLocalTieGroupComponent extends AbstractGroupComponent<SurveyedLocalTieViewModel> {

    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    getControlName(): string {
        return 'surveyedLocalTies';
    }

    /* **************************************************
     * Other methods
     */
    getNewItemViewModel(): SurveyedLocalTieViewModel {
        return new SurveyedLocalTieViewModel();
    }

    protected hasEndDateField(): boolean {
        return false;
    }
}
