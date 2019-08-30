import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GeodesyMLCodelistService } from './geodesyml-codelist.service';

@Injectable()
export class PrefetchAntennaRadomeCodelist implements Resolve<string[]> {

    constructor(private service: GeodesyMLCodelistService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {
        let codeName: string = 'AntennaRadome';
        return this.service.getCodelist(codeName)
            .catch((error: any): any => {
                console.error(error);
                return Observable.empty();
            });
    }
}
