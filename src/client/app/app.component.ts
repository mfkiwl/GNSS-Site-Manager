import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Config, CorsSiteService, CorsSetupService, SiteLogService, DialogService, MiscUtils,
         ServiceWorkerService, JsonixService } from './shared/index';
import { SiteLogComponent } from './site-log/site-log.component';
import { JsonViewModelService } from './shared/json-data-view-model/json-view-model.service';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (SelectSiteComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [
    CorsSiteService,
    CorsSetupService,
    DialogService,
    MiscUtils,
    JsonixService,
    ServiceWorkerService,
    SiteLogService,
    SiteLogComponent,
    JsonViewModelService,
  ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  constructor(private siteLogComponent: SiteLogComponent, private viewContainerRef: ViewContainerRef, private router: Router) {
    console.log('Environment config', Config);
  }

  /**
   * Invoke the save() method of SiteLog component triggered by the "Save" button on Toolbar component
   *
   * @event: boolean - true if the selected siteId is not null
   */
  onSave(event: any) {
    if (event) {
      this.siteLogComponent.save();
    }
  }

  /**
   * Event triggered by the "Revert" button on Toolbar component.
   * Reload the page, discarding all user edits to the current record and refreshing it from the database.
   * We had tried to simply restore the model from the database and make the UI pristine,
   * but there are too many known and unknown bugs with that approach so we go with this extreme solution.
   *
   * @event: boolean - true if the selected siteId is not null
   */
  onRevert(event: any) {
    if (event) {
        this.siteLogComponent.confirmRevert();
    }
  }

  /**
   * Invoke the goToHomePage() method of SiteLog component triggered by the "Close" button on Toolbar component
   *
   * @event: boolean - true if the selected siteId is not null
   */
  onClose(event: any) {
    if (event) {
      this.siteLogComponent.goToHomePage();
    }
  }

  onActivate(event: any) {
    this.siteLogComponent = event;
    localStorage.setItem('routerUrl', this.router.url);
  }
}
