import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { mergeMap } from 'rxjs/operators';
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

    private webServiceUrl: string;

    /**
     * Creates a new CorsNetworkService with the injected Http.
     * @param {Http} http - The injected Http.
     * @param constantsService - Constants used in the application.
     * @constructor
     */
    constructor(private http: Http, private constantsService: ConstantsService) {
        this.webServiceUrl = this.constantsService.getWebServiceURL() + '/corsNetworks';
    }

    /**
     * Returns an Observable for the HTTP GET request for the REST Web Service resource.
     * @param {number} id - The Id of the CORS network.
     * @return {CorsNetworkModel} The Observable of a CORS network object for the HTTP request.
     */
    getCorsNetworksById(id: number): Observable<CorsNetworkModel> {
        return this.http.get(this.webServiceUrl + '/' + id)
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
        return this.http.get(this.webServiceUrl + '/search/findByName?name=' + networkName)
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
        let url = this.webServiceUrl + '?size=1000';
        return this.getCorsNetworksFromPage([], url);
    }

    /**
     * Recursively retrieve all CORS networks from each page of the HTTP request
     *
     * @param {CorsNetworkModel[]} corsNetworks - An array storing all CORS networks retrieved
     * @param {string} url - The URL of the HTTP request with page number parameter
     * @return {CorsNetworkModel[]} The Observable of a list of CORS networks for the HTTP request.
     */
    private getCorsNetworksFromPage(corsNetworks: CorsNetworkModel[], url: string): Observable<CorsNetworkModel[]> {
        return this.http.get(url).pipe(
            mergeMap((response: Response) => {
                corsNetworks.push(...this.parsePage(response));
                let nextUrl = this.parseNextLink(response);
                if (nextUrl) {
                    return this.getCorsNetworksFromPage(corsNetworks, nextUrl);
                } else {
                    console.info('Number of cors networks retrieved: ' + corsNetworks.length);
                    return Observable.of(corsNetworks);
                }
            })
        );
    }

    private parseNextLink(data: any): string {
        return (data && data['_links']['next']) ? data['_links']['next']['href'] : null;
    }

    private parsePage(data: any): CorsNetworkModel[] {
        let corsNetworks: CorsNetworkModel[] = [];
        let items: any[] = data ? data['_embedded']['corsNetworks'] : [];
        if (items) {
            items.forEach((item: any) => {
                let corsNetwork = new CorsNetworkModel(item.id, item.name, item.description);
                corsNetworks.push(corsNetwork);
            });
        }
        return corsNetworks;
    }
}
