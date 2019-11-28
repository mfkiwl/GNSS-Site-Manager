import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { User, UserSettings } from 'oidc-client';

import { AssociatedDocumentService } from './associated-document.service';
import { ConstantsService } from '../global/constants.service';
import { UserAuthService } from '../global/user-auth.service';

export function main() {
    describe('Associated Document Service', () => {
        let service: AssociatedDocumentService;
        const statusOK = 200;
        const documentName = 'AssociatedDocument_Upload_Testing.txt';
        const mockUserService = new (class MockUserService {
            settings: UserSettings = {id_token: '', session_state: '', access_token: '',
                                      refresh_token: '', token_type: '', scope: '',
                                      profile: null, expires_at: 0, state: {}};
            user: User = new User(this.settings);
        })();

        beforeAll(() => {
            let injector = ReflectiveInjector.resolveAndCreate([
                AssociatedDocumentService,
                ConstantsService,
                UserAuthService,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                {
                    provide: UserAuthService, useValue: mockUserService
                },
            ]);
            service = injector.get(AssociatedDocumentService);

            let backend = injector.get(MockBackend);
            let responses: Response[] = [
                new Response(new ResponseOptions({
                    body: 'http://localhost:4572/gnss-metadata-document-storage-local/' + documentName
                })),
                new Response(new ResponseOptions({status: statusOK}))
            ];
            backend.connections.subscribe((connection: any) => {
                let response = responses.shift();
                connection.mockRespond(response);
            });
        });

        it('should upload a document to S3 bucket', () => {
            let file = new File(['A dummy file for testing.'], documentName, {type: 'text/plain'});
            service.uploadDocument(documentName, file).subscribe((response: Response) => {
                const fileReference = response.text();
                expect(fileReference).toContain(documentName);
            });
        });

        it('should delete the uploaded document from S3 bucket', () => {
            service.deleteDocument(documentName).subscribe((response: Response) => {
                expect(response.status).toBe(statusOK);
            });
        });
    });
}
