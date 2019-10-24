import { FormControl, Validator } from '@angular/forms';
import { GeodesyMLCodelistService } from '../geodesyml-codelist/geodesyml-codelist.service';

const antennaRadomeTypePattern = /^[A-Z0-9\/._-]+( [A-Z0-9\/._-]+)* +[A-Z0-9]{4}$/;

/**
 * A Validator class for antenna and radome type input component.
 */
export class AntennaRadomeTypeValidator implements Validator {

    constructor(private geodesyMLCodelistService: GeodesyMLCodelistService) { }

    validate(formControl: FormControl): {[key: string]: any} {
        const value: string = formControl.value;
        if (value && value.length > 0) {
            const matches = value.match(antennaRadomeTypePattern);
            const warning = 'Unrecognised IGS antenna and radome type combination';
            if (matches && matches.length > 0) {
                const codeList: string[] = this.geodesyMLCodelistService.getAntennaRadomeCodes();
                const index = codeList.indexOf(value);
                return index >= 0 ? null : { invalid_antenna_radome_type : warning };
            } else {
                return { invalid_antenna_radome_type : warning };
            }
        }

        return null;
    }
}
