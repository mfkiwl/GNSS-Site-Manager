import { CanDeactivate } from '@angular/router';
import { SiteComponent } from './site.component';

export class ConfirmDeactivateSiteGuard implements CanDeactivate<SiteComponent> {

    canDeactivate(target: SiteComponent): Promise<boolean> {
        if(target.isFormDirty()) {
            return target.confirmCloseSitePage();
        }
        return Promise.resolve(true);
    }
}
