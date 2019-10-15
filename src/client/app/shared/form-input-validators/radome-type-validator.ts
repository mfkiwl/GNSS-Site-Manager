import { FormControl, Validator } from '@angular/forms';
import { GeodesyMLCodelistService } from '../geodesyml-codelist/geodesyml-codelist.service';

const radomeTypePattern = /^[A-Z0-9]{4}$/;

/**
 * A Validator class for radome type input component.
 */
export class RadomeTypeValidator implements Validator {

    constructor(private geodesyMLCodelistService: GeodesyMLCodelistService) { }

    validate(formControl: FormControl): { [key: string]: any } {
        const value: string = formControl.value;
        if (value && value.length > 0) {
            const matches = value.match(radomeTypePattern);
            const warning = 'Not a recognised IGS radome type';
            if (matches && matches.length > 0) {
                const codeList: string[] = this.geodesyMLCodelistService.getRadomeCodes();
                const index = codeList.indexOf(value);
                return index >= 0 ? null : { invalid_radome_type : warning };
            } else {
                return { invalid_radome_type : warning };
            }
        }

        return null;
    }
}
