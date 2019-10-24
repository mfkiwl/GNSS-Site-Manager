import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ConstantsService } from '../global/constants.service';
import { JsonixService } from '../jsonix/jsonix.service';
import { GeodesyMLCodelistService } from './geodesyml-codelist.service';

export function main() {
    describe('GeodesyML Codelist Service', () => {
        const antennaRadomeType1 = '3COAT-703       NONE';
        const antennaRadomeType2 = '3COAT-705       NONE';
        const antennaRadomeCodelistXml =
            `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <gmx:CodeListDictionary gml:id="GeodesyML_GNSSAntennaRadomeTypeCode"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:gmx="http://www.isotc211.org/2005/gmx"
                xmlns:gml="http://www.opengis.net/gml/3.2"
                xmlns:gts="http://www.isotc211.org/2005/gts"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:gmd="http://www.isotc211.org/2005/gmd">
                <gml:description>GeodesyML GNSS AntennaRadome Types</gml:description>
                <gml:name codeSpace="urn:xml-gov-au:icsm:egeodesy">GeodesyML_GNSSAntennaRadomeTypeCode</gml:name>
                <gmx:codeEntry>
                    <gmx:CodeDefinition gml:id="AntennaRadomeTypeCode_3COAT-703_NONE">
                        <gml:identifier codeSpace="urn:xml-gov-au:icsm:egeodesy">${antennaRadomeType1}</gml:identifier>
                    </gmx:CodeDefinition>
                </gmx:codeEntry>
                <gmx:codeEntry>
                    <gmx:CodeDefinition gml:id="AntennaRadomeTypeCode_3COAT-705_NONE">
                        <gml:identifier codeSpace="urn:xml-gov-au:icsm:egeodesy">${antennaRadomeType2}</gml:identifier>
                    </gmx:CodeDefinition>
                </gmx:codeEntry>
            </gmx:CodeListDictionary>`;

        let service: GeodesyMLCodelistService;

        beforeAll(() => {
            let injector = ReflectiveInjector.resolveAndCreate([
                ConstantsService,
                JsonixService,
                GeodesyMLCodelistService,
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
            service = injector.get(GeodesyMLCodelistService);

            let mockBackend = injector.get(MockBackend);
            mockBackend.connections.subscribe((connection: any) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: antennaRadomeCodelistXml
                })));
            });
        });

        it('should return a code list containing given antenna-radome types', () => {
            const codeName = 'AntennaRadome';
            service.getCodelist(codeName).subscribe((codelist: string[]) => {
                expect(codelist.length).toBeGreaterThan(1);
                expect(codelist).toContain(antennaRadomeType1);
                expect(codelist).toContain(antennaRadomeType2);
            });
        });
    });

    describe('GeodesyML Codelist Service', () => {
        const receiverType1 = '3SNAV GNSS-300';
        const receiverType2 = '3SNAV GNSS-300T';
        const receiverCodelistXml =
            `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <gmx:CodeListDictionary gml:id="GeodesyML_GNSSReceiverTypeCode"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:gmx="http://www.isotc211.org/2005/gmx"
                xmlns:gml="http://www.opengis.net/gml/3.2"
                xmlns:gts="http://www.isotc211.org/2005/gts"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:gmd="http://www.isotc211.org/2005/gmd">
                <gml:description>GeodesyML GNSS Receiver Types</gml:description>
                <gml:name codeSpace="urn:xml-gov-au:icsm:egeodesy">GeodesyML_GNSSReceiverTypeCode</gml:name>
                <gmx:codeEntry>
                    <gmx:CodeDefinition gml:id="ReceiverTypeCode_3SNAV_GNSS-300">
                        <gml:identifier codeSpace="urn:xml-gov-au:icsm:egeodesy">${receiverType1}</gml:identifier>
                    </gmx:CodeDefinition>
                </gmx:codeEntry>
                <gmx:codeEntry>
                    <gmx:CodeDefinition gml:id="ReceiverTypeCode_3SNAV_GNSS-300T">
                        <gml:identifier codeSpace="urn:xml-gov-au:icsm:egeodesy">${receiverType2}</gml:identifier>
                    </gmx:CodeDefinition>
                </gmx:codeEntry>
            </gmx:CodeListDictionary>`;

        let service: GeodesyMLCodelistService;

        beforeAll(() => {
            let injector = ReflectiveInjector.resolveAndCreate([
                ConstantsService,
                JsonixService,
                GeodesyMLCodelistService,
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
            service = injector.get(GeodesyMLCodelistService);

            let mockBackend = injector.get(MockBackend);
            mockBackend.connections.subscribe((connection: any) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: receiverCodelistXml
                })));
            });
        });

        it('should return a code list containing given receiver types', () => {
            const codeName = 'Receiver';
            service.getCodelist(codeName).subscribe((codelist: string[]) => {
                expect(codelist.length).toBeGreaterThan(1);
                expect(codelist).toContain(receiverType1);
                expect(codelist).toContain(receiverType2);
            });
        });
    });
}
