import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteComponent } from './site.component';
import { SiteRoutingModule } from './site-routing.module';
import { ConfirmDeactivateSiteGuard } from './site-deactivate.module';
import { SiteLogModule } from '../site-log/site-log.module';
import { SiteAdministrationModule } from '../site-administration/site-administration.module';
import { SharedModule } from '../shared/shared.module';
import { PrefetchSiteLogResolver } from '../shared/site-log/prefetch-site-log.service';
import { PrefetchCorsSiteResolver } from '../shared/cors-site/prefetch-cors-site.service';
import { PrefetchCorsNetworkResolver } from '../shared/cors-network/prefetch-cors-network.service';
import { PrefetchAntennaRadomeCodelist } from '../shared/geodesyml-codelist/prefetch-antenna-radome-codelist.service';
import { PrefetchReceiverCodelist } from '../shared/geodesyml-codelist/prefetch-receiver-codelist.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SiteRoutingModule,
        SiteLogModule,
        SiteAdministrationModule,
    ],
    declarations: [SiteComponent],
    exports: [SiteComponent],
    providers: [
        PrefetchSiteLogResolver,
        PrefetchCorsSiteResolver,
        PrefetchCorsNetworkResolver,
        PrefetchAntennaRadomeCodelist,
        PrefetchReceiverCodelist,
        ConfirmDeactivateSiteGuard,
    ],
})
export class SiteModule { }
