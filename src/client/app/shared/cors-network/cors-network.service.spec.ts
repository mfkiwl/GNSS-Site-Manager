import { ReflectiveInjector } from '@angular/core';
import { Http } from '@angular/http';
import { ConstantsService } from '../global/constants.service';
import { CorsNetworkModel } from './cors-network-model';
import { CorsNetworkService } from './cors-network.service';

export function main() {
    describe('CorsNetwork Service', () => {
        let corsNetworkService: CorsNetworkService;

        beforeEach(() => {

            let injector = ReflectiveInjector.resolveAndCreate([
                Http,
                ConstantsService,
                CorsNetworkService,
            ]);
            corsNetworkService = injector.get(CorsNetworkService);
        });

        it('should return a CORS network with a given Network Id', () => {
            let id: number = 1;
            corsNetworkService.getCorsNetworksById(id).map((corsNetwork: CorsNetworkModel) => {
                expect(corsNetwork.id).toEqual(id);
            });
        });

        it('should return a CORS network with a given Network name', () => {
            let name: string = 'APREF';
            corsNetworkService.getCorsNetworksByName(name).map((corsNetwork: CorsNetworkModel) => {
                expect(corsNetwork.name).toEqual(name);
            });
        });

        it('should return a list of CORS networks', () => {
            corsNetworkService.getAllCorsNetworks().map((corsNetworks: CorsNetworkModel[]) => {
                expect(corsNetworks).toBeDefined();
                expect(corsNetworks.length).toBeGreaterThan(20);
            });
        });
    });
}
