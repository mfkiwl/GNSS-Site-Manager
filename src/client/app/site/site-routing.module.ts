import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiteComponent } from './site.component';
import { ConfirmDeactivateSiteGuard } from './site-deactivate.module';
import { PrefetchSiteLogResolver } from '../shared/site-log/prefetch-site-log.service';
import { PrefetchCorsSiteResolver } from '../shared/cors-site/prefetch-cors-site.service';
import { PrefetchCorsNetworkResolver } from '../shared/cors-network/prefetch-cors-network.service';
import { PrefetchAntennaRadomeCodelist } from '../shared/geodesyml-codelist/prefetch-antenna-radome-codelist.service';
import { PrefetchReceiverCodelist } from '../shared/geodesyml-codelist/prefetch-receiver-codelist.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'site/:id',
                component: SiteComponent,
                resolve: {
                    siteLogModel: PrefetchSiteLogResolver,
                    siteAdminModel: PrefetchCorsSiteResolver,
                    corsNetworkList: PrefetchCorsNetworkResolver,
                    antennaRadomeCodelist: PrefetchAntennaRadomeCodelist,
                    receiverCodelist: PrefetchReceiverCodelist,
                },
                canDeactivate: [ConfirmDeactivateSiteGuard],
            }
        ]),
    ],
    exports: [RouterModule],
    providers: [
        PrefetchSiteLogResolver,
        PrefetchCorsSiteResolver,
        PrefetchCorsNetworkResolver,
        PrefetchAntennaRadomeCodelist,
        PrefetchReceiverCodelist,
    ]
})
export class SiteRoutingModule { }
