import { FormControl, Validator } from '@angular/forms';
import { GeodesyMLCodelistService } from '../geodesyml-codelist/geodesyml-codelist.service';

const antennaRadomeTypePattern = /^[A-Z0-9._-]+( [A-Z0-9._-]+)* +[A-Z0-9]{4}$/;

/**
 * A Validator class for antenna and radome type input component.
 */
export class AntennaRadomeTypeValidator implements Validator {

    constructor(private geodesyMLCodelistService: GeodesyMLCodelistService) { }

    validate(formControl: FormControl): {[key: string]: any} {
        const value: string = formControl.value;
        if (value && value.length > 0) {
            const matches = value.match(antennaRadomeTypePattern);
            if (matches && matches.length > 0) {
                const codeList: string[] = this.geodesyMLCodelistService.getAntennaRadomeCodes();
                const index = codeList.indexOf(value);
                const radome: string = value.slice(16, 20);
                const receiver: string = value.slice(0, 15).trim();
                return index >= 0 ? null : {
                    invalid_antenna_radome_type:
                        'Receiver "' + receiver + '" plus radome "' + radome +
                        '" is not an IGS recognized antenna radome combination.'
                };
            } else {
                return {
                    invalid_antenna_radome_type:
                        'IGS unrecognized antenna type consists of capital letters, number, ' +
                        'underscores (_), hyphens (-), and periods (.), no consecutive spaces. ' +
                        'Radome type consists of 4 capital letters or numbers. ' +
                        'Concatenate antenna type and radome type with one or more spaces to ' +
                        'form a 20 character Antenna Radome Type.' };
            }
        }

        return null;
    }
}
