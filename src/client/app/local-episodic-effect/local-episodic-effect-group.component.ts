import { Component } from '@angular/core';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { LocalEpisodicEffectViewModel } from './local-episodic-effect-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**.
 * This class represents a group of Local Episodic Effects.
 */
@Component({
    moduleId: module.id,
    selector: 'local-episodic-effect-group',
    templateUrl: 'local-episodic-effect-group.component.html',
})
export class LocalEpisodicEffectGroupComponent extends AbstractGroupComponent<LocalEpisodicEffectViewModel> {

    constructor(protected siteLogService: SiteLogService) {
        super(siteLogService);
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }

    getControlName(): string {
        return 'localEpisodicEffects';
    }

    /* **************************************************
     * Other methods
     */
    getNewItemViewModel(): LocalEpisodicEffectViewModel {
        return new LocalEpisodicEffectViewModel();
    }
}
