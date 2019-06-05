import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { GnssAntennaViewModel } from './gnss-antenna-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a collection of GNSS Antenna items.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-antenna-group',
    templateUrl: 'gnss-antenna-group.component.html',
})
export class GnssAntennaGroupComponent extends AbstractGroupComponent<GnssAntennaViewModel> {
    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'GNSS Antenna';
    }

    getControlName(): string {
        return 'gnssAntennas';
    }

    getNewItemViewModel(): GnssAntennaViewModel {
        return new GnssAntennaViewModel();
    }

    /**
     * Copy values from the current item to the new item created, and disable key fields if required.
     */
    copyValuesFromCurrentItem(newItemForm: FormGroup, currentItemForm: FormGroup): void {
        let filedsToCopy = ['antennaType', 'serialNumber', 'antennaReferencePoint',
                            'markerArpEastEcc', 'markerArpUpEcc', 'markerArpNorthEcc',
                            'alignmentFromTrueNorth', 'antennaRadomeType', 'radomeSerialNumber',
                            'antennaCableType', 'antennaCableLength'];
        let valuesToCopy = _.pick(currentItemForm.getRawValue(), filedsToCopy);
        newItemForm.patchValue(_.cloneDeep(valuesToCopy));

        // Disable of the two fileds must be after patchValue() completed, so need the 2nd setTimeout
        setTimeout(() => {
            newItemForm.controls.antennaType.disable();
            newItemForm.controls.serialNumber.disable();
        });
    }
}
