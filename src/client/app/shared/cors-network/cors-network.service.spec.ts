import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ConstantsService } from '../global/constants.service';
import { CorsNetworkService } from './cors-network.service';
import { HttpUtilsService } from '../global/http-utils.service';
import { CorsNetworkModel } from './cors-network-model';

export function main() {
    describe('CorsNetwork Service', () => {
        const mockResponse = { id: 1, name: 'APREF', description: 'testing' };
        let corsNetworkService: CorsNetworkService;

        beforeAll(() => {
            let injector = ReflectiveInjector.resolveAndCreate([
                ConstantsService,
                CorsNetworkService,
                HttpUtilsService,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
            ]);

            corsNetworkService = injector.get(CorsNetworkService);
            let mockBackend = injector.get(MockBackend);
            mockBackend.connections.subscribe((connection: any) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
        });

        it('should return a CORS network with a given network Id', () => {
            let id: number = 1;
            corsNetworkService.getCorsNetworksById(id).subscribe((data: any) => {
                let corsNetwork: CorsNetworkModel = data.value;
                expect(corsNetwork.id).toEqual(id);
            });
        });

        it('should return a CORS network with a given network name', () => {
            let name: string = 'APREF';
            corsNetworkService.getCorsNetworksByName(name).subscribe((data: any) => {
                let corsNetwork: CorsNetworkModel = data.value;
                expect(corsNetwork.name).toEqual(name);
            });
        });
    });

    describe('CorsNetwork Service', () => {
        const mockResponse = {
            '_embedded': {
                corsNetworks: [
                    { id: 1, name: 'APREF', description: 'testing' },
                    { id: 51, name: 'ARGN', description: 'testing' },
                    { id: 101, name: 'AUSCOPE', description: 'testing' },
                    { id: 151, name: 'CAMPAIGN', description: 'testing' }
                ]
            },
            '_links' : {}
        };
        let corsNetworkService: CorsNetworkService;

        beforeAll(() => {
            let injector = ReflectiveInjector.resolveAndCreate([
                ConstantsService,
                CorsNetworkService,
                HttpUtilsService,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
            ]);

            corsNetworkService = injector.get(CorsNetworkService);
            let mockBackend = injector.get(MockBackend);
            mockBackend.connections.subscribe((connection: any) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
        });

        it('should return a list of CORS networks', () => {
            corsNetworkService.getAllCorsNetworks().subscribe((data: any) => {
                let corsNetworks: CorsNetworkModel[] = data;
                expect(corsNetworks).toBeDefined();
                expect(corsNetworks.length).toBeGreaterThan(3);
            });
        });
    });
}
