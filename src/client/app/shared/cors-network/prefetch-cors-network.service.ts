import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../global/dialog.service';
import { CorsNetworkService } from './cors-network.service';
import { CorsNetworkModel } from './cors-network-model';

@Injectable()
export class PrefetchCorsNetworkResolver implements Resolve<CorsNetworkModel[]> {

    constructor(private dialogService: DialogService,
                private corsNetworkService: CorsNetworkService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CorsNetworkModel[]> {
        return this.corsNetworkService.getAllCorsNetworks()
            .catch((error: any): any => {
                this.dialogService.showErrorMessage('Warning: no CORS networks found.');
                console.log(error);
                return Observable.empty();
            });
    }
}
