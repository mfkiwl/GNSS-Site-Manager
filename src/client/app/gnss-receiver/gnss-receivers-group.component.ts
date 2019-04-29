import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

        let attrNames = ['receiverType', 'manufacturerSerialNumber', 'firmwareVersion',
                         'satelliteSystems', 'elevationCutoffSetting', 'temperatureStabilization', 'notes'];
        setTimeout(() => {
            let newFormGroup = <FormGroup>this.parentForm.at(0);
            let oldFormGroup = <FormGroup>this.parentForm.at(1);
            attrNames.map((attrName: string) => {
                let value = oldFormGroup.get(attrName).value;
                if (value) {
                    newFormGroup.get(attrName).setValue(value);
                    newFormGroup.get(attrName).markAsDirty();
                }
            });
            newFormGroup.controls.receiverType.disable();
            newFormGroup.controls.manufacturerSerialNumber.disable();
        });
    }
}
