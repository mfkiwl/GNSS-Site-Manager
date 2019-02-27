import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpUtilsService } from '../global/http-utils.service';
import { ConstantsService } from '../global/constants.service';
import { CorsNetworkModel } from './cors-network-model';

/**
 * This class provides the service with methods to retrieve CORS networks from DB.
 */
@Injectable()
export class CorsNetworkService {

    private resourceUrl: string;

    /**
     * Creates a new CorsNetworkService with the injected Http.
     * @param {Http} http - The injected Http.
     * @param constantsService - Constants used in the application.
     * @constructor
     */
    constructor(private http: Http, private constantsService: ConstantsService, private httpUtils: HttpUtilsService) {
        this.resourceUrl = this.constantsService.getWebServiceURL() + '/corsNetworks';
    }

    /**
     * Returns an Observable for the HTTP GET request for the REST Web Service resource.
     * @param {number} id - The Id of the CORS network.
     * @return {CorsNetworkModel} The Observable of a CORS network object for the HTTP request.
     */
    getCorsNetworksById(id: number): Observable<CorsNetworkModel> {
        return this.http.get(this.resourceUrl + '/' + id)
            .map((response: Response) => {
                let data = response.json();
                let corsNetwork = new CorsNetworkModel(data.id, data.name, data.description);
                return Observable.of(corsNetwork);
            })
            .catch(HttpUtilsService.handleError);
    }

    /**
     * Returns an Observable for the HTTP GET request for the REST Web Service resource.
     * @param {string} networkName - The name of the network.
     * @return {CorsNetworkModel} The Observable of a CORS network object for the HTTP request.
     */
    getCorsNetworksByName(networkName: string): Observable<CorsNetworkModel> {
        return this.http.get(this.resourceUrl + '?name=' + networkName)
            .map((response: Response) => {
                let data = response.json();
                let corsNetwork = new CorsNetworkModel(data.id, data.name, data.description);
                return Observable.of(corsNetwork);
            })
            .catch(HttpUtilsService.handleError);
    }

    /**
     * Returns an Observable for the HTTP GET request for all records available from the CORS Network DB.
     *
     * @return {CorsNetworkModel[]} The Observable of a list of CORS networks for the HTTP request.
     */
    getAllCorsNetworks(): Observable<CorsNetworkModel[]> {
        let url = this.resourceUrl + '?size=1000';
        let resourceName = 'corsNetworks';
        return this.httpUtils.getResourcesFromPage(resourceName, [], url, (item: any): CorsNetworkModel => {
            return new CorsNetworkModel(item.id, item.name, item.description);
        });
    }
}
