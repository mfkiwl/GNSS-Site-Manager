import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JsonixService } from '../jsonix/jsonix.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { GlobalService } from '../global/global.service';

/**
 * This class provides the service with methods to retrieve CORS Setup info from DB.
 */
@Injectable()
export class SiteLogService {
  private static handleData(response: Response) {
    return response.json();
  }

   /**
   * Handle HTTP error
   */
  private static handleError(error: any): ErrorObservable {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    errMsg += error.stack;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private handleXMLData(response: Response): string {
    if (response.status === 200) {
      var geodesyMl: any = response.text();
      let json: string = this.jsonixService.geodesyMLToJson(geodesyMl);
      console.log('handleXMLData - json: ', json);
      return json;
    } else {
      let msg: string = 'Error with GET: ' + response.url;
      throw new Error(msg);
    }
  }

  /**
   * Creates a new SiteLogService with the injected Http.
   * @param {Http} http - The injected Http.
   * @param jsonixService - Service for translating GeodesyML to Json
   * @param globalService - Common methods
   * @constructor
   */
  constructor(private http: Http, private jsonixService: JsonixService, private globalService: GlobalService) {
  }

  /**
   * Returns one site log defined by the fourCharacterId.
   * @param {string} fourCharacterId - The Four Character Id of the site.
   * @return {object[]} The Observable for the HTTP request in JSON format.
   */
  getSiteLogByFourCharacterId(fourCharacterId: string): Observable<any> {
    console.log('getSiteLogByFourCharacterId(fourCharacterId: ', fourCharacterId);
    return this.http.get(this.globalService.getWebServiceURL()
                         + '/siteLogs/search/findByFourCharacterId?id=' + fourCharacterId + '&format=json')
      .map(SiteLogService.handleData)
      .catch(SiteLogService.handleError);
  }

  /**
   * Returns one site log defined by the fourCharacterId.  Alternative method that retrieves GeodeesyML format
   * from the backend service and returns an alternative JSON equivalent that is almost, but not quite the same
   * as the JSON returned froom getSiteLogByFourCharacterId();
   * @param {string} fourCharacterId - The Four Character Id of the site.
   * @return {object[]} The Observable for the HTTP request in JSON format slightly different from that from
   * getSiteLogByFourCharacterId().
   */
  getSiteLogByFourCharacterIdUsingGeodesyML(fourCharacterId: string): Observable<any> {
    console.log('getSiteLogByFourCharacterId(fourCharacterId: ', fourCharacterId);
    return this.http.get(this.globalService.getWebServiceURL()
                         + '/siteLogs/search/findByFourCharacterId?id=' + fourCharacterId + '&format=geodesyml')
      .map((response: Response) => {
        return this.handleXMLData(response);
      })
      .catch(SiteLogService.handleError);
  }

  /**
   * Returns all site logs with the given siteId.
   * @param {number} siteId - The foreign key Site Id to the SiteLog table.
   * @return {object[]} The Observable for the HTTP request.
   */
  getSiteLogsBySiteId(siteId: number): Observable <any> {
    let params = '';
    if (typeof siteId !== 'undefined' && siteId !== null && siteId > 0) {
      params = 'siteId=' + siteId;
    }
    return this.http.get(this.globalService.getWebServiceURL() + '/siteLogs?' + params)
      .map(SiteLogService.handleData)
      .catch(SiteLogService.handleError);
  }

  /**
   * Returns one site log defined by the row id provided.
   * @param {number} id - The primary key Id of the SiteLog record.
   * @return {object[]} The Observable for the HTTP request.
   */
  getSiteLogById(id: number): Observable <any> {
    return this.http.get(this.globalService.getWebServiceURL() + '/siteLogs?id=' + id)
      .map(SiteLogService.handleData)
      .catch(SiteLogService.handleError);
  }

  /**
   * Returns all records from the SiteLog table.
   * @return {object[]} The Observable for the HTTP request.
   */
  getAllSiteLogs(): Observable <any[]> {
    return this.http.get(this.globalService.getWebServiceURL() + '/siteLogs?size=1000')
      .map(SiteLogService.handleData)
      .catch(SiteLogService.handleError);
  }
}
