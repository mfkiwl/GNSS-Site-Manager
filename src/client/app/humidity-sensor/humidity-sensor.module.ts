import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HumiditySensorGroupComponent } from './humidity-sensor-group.component';
import { HumiditySensorItemComponent } from './humidity-sensor-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [HumiditySensorGroupComponent, HumiditySensorItemComponent],
    exports: [HumiditySensorGroupComponent, HumiditySensorItemComponent]
})
export class HumiditySensorModule {
}
