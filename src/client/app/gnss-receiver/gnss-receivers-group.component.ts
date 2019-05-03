import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

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
    addNewByCopying(event: UIEvent) {
        if (!this.hasItems()) {
            return;
        }

        this.addNew(event);

        let fieldsToKeep = ['receiverType', 'manufacturerSerialNumber', 'firmwareVersion',
                            'satelliteSystems', 'elevationCutoffSetting',
                            'temperatureStabilization', 'notes'];
        setTimeout(() => {
            let newFormGroup = <FormGroup>this.parentForm.at(0);
            let oldFormGroup = <FormGroup>this.parentForm.at(1);
            let valuesToCopy = _.pick(oldFormGroup.getRawValue(), fieldsToKeep);
            newFormGroup.patchValue(valuesToCopy);

            // Disable of the two fileds must be after patchValue() completed, so need the 2nd setTimeout
            setTimeout(() => {
                newFormGroup.controls.receiverType.disable();
                newFormGroup.controls.manufacturerSerialNumber.disable();
            });
        });
    }
}
