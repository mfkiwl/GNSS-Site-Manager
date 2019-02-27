import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Rx';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class HttpUtilsService {

    /**
     * Used as part of http get Observables.  Defined so can easily change to 'handleDataDebug'.
     *
     * @param response
     * @returns {Promise<JSON>}
     */
    public static handleJsonData(response: Response) {
        return response.json();
    }

    public static handleJsonDataDebug(response: Response) {
        let data: any = response.json();
        console.debug('handleDataDebug: ', data);
        return data;
    }

    /**
     * Handle HTTP error
     */
    public static handleError(error: any): ErrorObservable {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        errMsg += error.stack;
        console.error(errMsg);
        return Observable.throw(error.json().error || 'Server error');
    }

    /**
     * Creates a new HttpUtilsService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
    */
    constructor(private http: Http) {}

    /**
     * Returns an Observable for the HTTP GET request for the JSON resource.
     * @return {string[]} The Observable for the HTTP request.
    */
    public loadJsonObject(jsonFilePath: string): Observable<string[]> {
        return this.http.get(jsonFilePath)
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
    }

    /**
     * Recursively retrieve all resources from each page of the HTTP request
     *
     * @param {T[]} resources - An array of all resources retrieved
     * @param {string} url - The URL of the HTTP request with page number parameter
     * @return {T[]} The Observable of a list of resources for the HTTP request.
     */
    public getResourcesFromPage<T>(resourceName: string, resources: T[], url: string, resourceParser: (item: any) => T): Observable<T[]> {
        return this.http.get(url).pipe(
            mergeMap((response: Response) => {
                let data = response.json();
                let items: any[] = data ? data['_embedded'][resourceName] : [];
                items.forEach((item: any) => {
                    resources.push(resourceParser(item));
                });

                let nextUrl = (data && data['_links']['next']) ? data['_links']['next']['href'] : null;
                if (nextUrl) {
                    return this.getResourcesFromPage(resourceName, resources, nextUrl, resourceParser);
                } else {
                    return Observable.of(resources);
                }
            })
        );
    }
}
