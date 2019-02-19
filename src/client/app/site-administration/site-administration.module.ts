import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from '../shared/form-input/form-input.module';
import { SiteAdministrationComponent } from './site-administration.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormInputModule,
    ],
    declarations: [SiteAdministrationComponent],
    exports: [SiteAdministrationComponent]
})
export class SiteAdministrationModule { }
