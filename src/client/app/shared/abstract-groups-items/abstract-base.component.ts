import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SiteLogService } from '../site-log/site-log.service';

export abstract class AbstractBaseComponent implements OnDestroy {

    public isAuthorised: boolean;
    private authorisedSubscription: Subscription;

    constructor(siteLogService: SiteLogService) {
        this.authorisedSubscription = siteLogService.isUserAuthorisedToEditSite.subscribe(f => {
            this.isAuthorised = f;
        });
    }

    ngOnDestroy() {
        this.authorisedSubscription.unsubscribe();
    }
}
