import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyedLocalTieGroupComponent } from './surveyed-local-tie-group.component';
import { SurveyedLocalTieItemComponent } from './surveyed-local-tie-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [SurveyedLocalTieGroupComponent, SurveyedLocalTieItemComponent],
    exports: [SurveyedLocalTieGroupComponent, SurveyedLocalTieItemComponent, FormInputModule]
})
export class SurveyedLocalTieModule {
}
