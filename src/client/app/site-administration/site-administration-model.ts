import { CorsNetworkModel } from '../shared/cors-network/cors-network-model';

/**
 * This is the Data & View Models for Site Administration.
 */
export class SiteAdministrationModel {
    public id: number;
    public siteStatus: string;
    public corsNetworks: CorsNetworkModel[];

    constructor(id: number = null, status: string = 'PUBLIC') {
        this.id = id;
        this.siteStatus = status;
        this.corsNetworks = [];
    }

    public parseNetworkTenancies(networkTenancies: any[]) {
        if (networkTenancies) {
            networkTenancies.forEach((network: any) => {
                let corsNetwork = new CorsNetworkModel(network.corsNetworkId, null, null);
                this.corsNetworks.push(corsNetwork);
            });
        }
    }

    public mapNetworkNames(corsNetworkList: CorsNetworkModel[]) {
        this.corsNetworks.forEach((networkCurrent: CorsNetworkModel) => {
            let networkFound = this.findCorsNetworkModelById(networkCurrent.id, corsNetworkList);
            if (networkFound) {
                networkFound.added = true;
                networkCurrent.name = networkFound.name;
                networkCurrent.description = networkFound.description;
                networkCurrent.selected = networkFound.selected;
            }
        });
    }

    private findCorsNetworkModelById(networkId: number, corsNetworkList: CorsNetworkModel[]): CorsNetworkModel {
        for (let network of corsNetworkList) {
            if (network.id === networkId) {
                return network;
            }
        }

        return null;
    }
}
