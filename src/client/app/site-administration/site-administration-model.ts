/**
* This is the Data & View Models for Site Administration.
*/

export class SiteAdministrationModel {
    public id: number;
    public siteStatus: string;

    constructor(id: number = null, status: string = 'PUBLIC') {
        this.id = id;
        this.siteStatus = status;
    }
}
