import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';
import { MiscUtils } from '../shared/global/misc-utils';

/**.
 * This class represents a group of GNSS Receivers.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-receivers-group',
    templateUrl: 'gnss-receivers-group.component.html',
})
export class GnssReceiversGroupComponent extends AbstractGroupComponent<GnssReceiverViewModel> {
    constructor(protected siteLogService: SiteLogService, protected formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'GNSS Receiver';
    }

    getControlName(): string {
        return 'gnssReceivers';
    }

    /* **************************************************
     * Other methods
     */
    getNewItemViewModel(): GnssReceiverViewModel {
        return new GnssReceiverViewModel();
    }

    /**
     * Add a new GNSS Receiver by copying and updating values from the current one
     */
    updateCurrentReceiver(event: UIEvent) {
        if (!this.hasItems()) {
            return;
        }

        event.preventDefault();
        this.isGroupOpen = true;
        let dateUtc: string = MiscUtils.getUTCDateTime();
        let gnssReceivers = this.getItems();

        let newReceiverViewModel = _.cloneDeep(gnssReceivers[0]);
        newReceiverViewModel.id = null;
        newReceiverViewModel.startDate = dateUtc;
        newReceiverViewModel.endDate = null;
        newReceiverViewModel.dateInserted = dateUtc;
        newReceiverViewModel.dateDeleted = null;
        this.addToItems(newReceiverViewModel);

        setTimeout(() => {
            let newFormGroup = <FormGroup>this.parentForm.at(0);
            newFormGroup.controls.receiverType.disable();
            newFormGroup.controls.manufacturerSerialNumber.disable();
            newFormGroup.markAsDirty();

            let currentFormGroup = <FormGroup>this.parentForm.at(1);
            currentFormGroup.controls.endDate.setValue(dateUtc);
            currentFormGroup.controls.endDate.markAsDirty();

            newFormGroup.controls.startDate.valueChanges.subscribe((date: string) => {
                currentFormGroup.controls.endDate.setValue(date);
                currentFormGroup.controls.endDate.markAsDirty();
            });
        });

        this.newItemEvent();
    }
}
