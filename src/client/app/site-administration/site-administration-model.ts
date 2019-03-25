import { CorsNetworkModel } from '../shared/cors-network/cors-network-model';

/**
 * This is the Data & View Models for Site Administration.
 */
export class SiteAdministrationModel {
    public id: number;
    public siteStatus: string;
    public addToNetworkHref: string;
    public removeFromNetworkHref: string;
    public corsNetworks: CorsNetworkModel[] = [];

    constructor(corsSite: any = null) {
        if(corsSite) {
            this.id = corsSite.id;
            this.siteStatus = corsSite.siteStatus;
            this.addToNetworkHref = corsSite._links.addToNetwork.href;
            this.removeFromNetworkHref = corsSite._links.removeFromNetwork.href;
            this.parseNetworkTenancies(corsSite.networkTenancies);
        }
    }

    public mapNetworkNames(corsNetworkList: CorsNetworkModel[]) {
        this.corsNetworks.map((networkCurrent: CorsNetworkModel) => {
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

    private parseNetworkTenancies(networkTenancies: any[]) {
        if (networkTenancies) {
            networkTenancies.forEach((network: any) => {
                this.corsNetworks.push(new CorsNetworkModel(network.corsNetworkId, null, null, network.period));
            });
        }
    }
}
