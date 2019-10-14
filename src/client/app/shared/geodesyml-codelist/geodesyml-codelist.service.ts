import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { ConstantsService } from '../global/constants.service';
import { JsonixService } from '../jsonix/jsonix.service';

/**
 * This class provides a http service for retrieving geodesyml codelists from AWS S3 bucket.
 */
@Injectable()
export class GeodesyMLCodelistService {

    private static allReceiverCodes: string[] = [];

    private static allAntennaRadomeCodes: string[] = [];

    constructor(private http: Http,
                private jsonixService: JsonixService,
                private constantsService: ConstantsService) {}

    public getCodelist(codeName: string): Observable<string[]> {
        let codelistXml = 'GNSS-' + codeName + '-Codelists.xml';
        let url = this.constantsService.getCodelistUrl() + '/' + codelistXml;
        console.log('Retrieving ' + codeName + ' codelist from ' + url);
        return this.http.get(url)
            .map((response: Response) => {
                let json = this.jsonixService.geodesyMLToJson(response.text());
                return this.jsonToCodelist(json, codeName);
            })
            .catch(this.handleError);
    }

    public getReceiverCodes(): string[] {
        return GeodesyMLCodelistService.allReceiverCodes;
    }

    public getAntennaRadomeCodes(): string[] {
        return GeodesyMLCodelistService.allAntennaRadomeCodes;
    }

    private handleError(error: any): ErrorObservable {
        let errorMsg = error.message ? error.message : error.status ?
            error.status + ' - ' + error.statusText : 'Server error';
        let errorBody = error._body ? '\n' + error._body : '';
        console.error(errorMsg + errorBody);
        return Observable.throw(errorMsg);
    }

    private jsonToCodelist(json: any, codeName: string): string[] {
        let codeList = [];
        let codeEntries = json['gmx:CodeListDictionary']['codeEntry'];
        for (let codeEntry of codeEntries) {
            let codeValue = codeEntry.codeDefinition['gmx:CodeDefinition'].identifier.value;
            codeList.push(codeValue);
        }
        if (codeName.includes('Receiver')) {
            GeodesyMLCodelistService.allReceiverCodes = codeList;
        }
        if (codeName.includes('Antenna')) {
            GeodesyMLCodelistService.allAntennaRadomeCodes = codeList;
        }
        return codeList;
    }
}
