/**
* This is the Data & View Models for Site Administration.
*/

export class SiteAdministrationModel {
    public id: number;
    public siteStatus: string;
    public corsNetworkIds: number[];

    constructor(id: number = null, status: string = 'PUBLIC') {
        this.id = id;
        this.siteStatus = status;
        this.corsNetworkIds = [];
    }

    public parseNetworkTenancies(networkTenancies: any[]) {
        if (networkTenancies) {
            networkTenancies.forEach((network: any) => {
                this.corsNetworkIds.push(network.corsNetworkId);
            });
        }
    }

    public getCorsNetworkIds(): string {
        return this.corsNetworkIds.join(', ');
    }
}
