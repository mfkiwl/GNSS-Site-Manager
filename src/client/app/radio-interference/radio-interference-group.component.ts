import { Component } from '@angular/core';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { RadioInterferenceViewModel } from './radio-interference-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'radio-interferences-group',
    templateUrl: 'radio-interference-group.component.html',
})
export class RadioInterferenceGroupComponent extends AbstractGroupComponent<RadioInterferenceViewModel> {

    constructor(protected siteLogService: SiteLogService) {
        super(siteLogService);
    }

    getItemName(): string {
        return 'Radio Interference';
    }

    getControlName(): string {
        return 'radioInterferences';
    }

    getNewItemViewModel(): RadioInterferenceViewModel {
        return new RadioInterferenceViewModel();
    }
}
