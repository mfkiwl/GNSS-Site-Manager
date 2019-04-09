import * as _ from 'lodash';
import { CorsNetworkModel } from '../shared/cors-network/cors-network-model';
import { CorsSite, NetworkTenancy } from '../shared/cors-site/cors-site-model';

/**
 * This is the Data & View Models for Site Administration.
 */
export class SiteAdministrationModel {
    public id: number;
    public siteStatus: string;
    public addToNetworkHref: string;
    public removeFromNetworkHref: string;
    public corsNetworks: CorsNetworkModel[] = [];

    constructor(corsSite: CorsSite = null) {
        if(corsSite) {
            this.id = corsSite.id;
            this.siteStatus = corsSite.siteStatus;
            this.addToNetworkHref = corsSite._links.addToNetwork.href;
            this.removeFromNetworkHref = corsSite._links.removeFromNetwork.href;
            this.parseNetworkTenancies(corsSite.networkTenancies);
        }
    }

    public mapNetworkNames(corsNetworks: CorsNetworkModel[]) {
        this.corsNetworks.map((networkCurrent: CorsNetworkModel) => {
            let networkFound = _.find(corsNetworks, ['id', networkCurrent.id]);
            if (networkFound) {
                networkFound.added = true;
                networkCurrent.name = networkFound.name;
                networkCurrent.description = networkFound.description;
                networkCurrent.selected = networkFound.selected;
            }
        });
    }

    private parseNetworkTenancies(networkTenancies: NetworkTenancy[]) {
        if (networkTenancies) {
            networkTenancies.forEach((network: NetworkTenancy) => {
                this.corsNetworks.push(new CorsNetworkModel(network.corsNetworkId, null, null, network.period));
            });
        }
    }
}
